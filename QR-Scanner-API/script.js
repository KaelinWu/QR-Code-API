//TEXT

const dataInput = document.querySelector("#data");
console.log(dataInput.value);
// Image format


const imageFormat = document.querySelector('input[name="format"]:checked');



//Colors
const mainColorPicker = document.querySelector('#color');
const mainColorValue = document.querySelector('#color-value');

const backgroundColorPicker = document.querySelector('#bg-color');
const backgroundColorValue = document.querySelector('#bg-color-value');

const updateColor = e => {
    const value = e.target.value;
    mainColorValue.innerText = value;
};

const updateBackgroundColor = e => {
    const value = e.target.value;
    backgroundColorValue.innerText = value;
};

const addColorPickerEventListeners = () => {
    mainColorPicker.addEventListener('change', updateColor);
    backgroundColorPicker.addEventListener('change', updateBackgroundColor);
};


addColorPickerEventListeners();


//Sliders

const sizeSlider = document.querySelector("#size");
const marginSlider = document.querySelector("#margin");

const sizeValue = document.querySelector("#size-value");
const marginValue = document.querySelector("#margin-value");

const updateSize = e => {
    const value = e.target.value;
    sizeValue.innerText = value + "x" + value;
};

const updateMargin = e => {
    const value = e.target.value;
    marginValue.innerText = value + "px";
};

const addSliderEventListerners = () => {

    sizeSlider.addEventListener('change', updateSize);
    marginSlider.addEventListener('change', updateMargin);
};

addSliderEventListerners();

const submitButton = document.querySelector('#cta');

const showInputError = () =>{
    dataInput.classList.add('error');
};

const addDataInputEventListener = () =>{
    dataInput.addEventListener('change', (e)=>{
        if(e.target.value !== '') {
            dataInput.classList.remove('error');
            submitButton.removeAttribute('disabled');
        }
        else{
            dataInput.classList.add('error');
            submitButton.setAttribute('disabled', true);
        }
    });
};

addDataInputEventListener();

const prepareParameters = params => {

    return {
        data: params.data,
        size: `${params.size}x${params.size}`,
        color: params.color.replace('#', ''),
        bgcolor: params.bgColor.replace('#', ''),
        qzone: params.qZone,
        format: params.format,
    };
};

const settingContainer = document.querySelector('#qr-code-settings');
const resultsContainer = document.querySelector('#qr-code-result');
const qrCodeImager = document.querySelector('#qr-code-image');


const displayQrCode = (imgurl) => {
    settingContainer.classList.add('flipped');
    resultsContainer.classList.add('flipped');

    qrCodeImager.setAttribute('src', imgurl);

};

const getQrCode = (parameters) => {
    const urlParams = new URLSearchParams(parameters).toString();
    const baseURL = 'https://api.qrserver.com/v1/create-qr-code/'
   
    const fullURL = `${baseURL}?${urlParams}`;

    fetch(`${baseURL}?${urlParams}`).then(response => {
        if(response.status === 200){
            displayQrCode(fullURL);
        }
    });
}
const onSubmit = () => {

    console.log('clicked');
    const data = dataInput.value;
    if (!data.length){
        return showInputError();
    }
    const color = mainColorPicker.value;
    const bgColor = backgroundColorPicker.value;
    const size = sizeSlider.value;
    const qZone = marginSlider.value;
    const format = imageFormat.value;

    const parameters = prepareParameters({data, color, bgColor, size, qZone, format});

    getQrCode(parameters)

};

const addSubmitEventListener = () => {

submitButton.addEventListener('click', onSubmit)

};

addSubmitEventListener();


const editbutton = document.querySelector('#edit');

const onEdit = () =>{

    settingContainer.classList.remove('flipped');
    resultsContainer.classList.remove('flipped');
}

const addEditButtonEventListenr = () =>{
    editbutton.addEventListener('click', onEdit);

}

addEditButtonEventListenr();
