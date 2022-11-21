function resetErrors(inputs,errorTexts,errorInfo){
    for(let i=0;i<inputs.length;i++){
        inputs[i].classList.remove("error-input");
    }
    for(let i=0;i<errorTexts.length;i++){
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText="";
}
function checkRequired (value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    if(value ===""){
        return false;
    }
    return true;
}
function checkTextLengthRange(value,min,max){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if(max && length > max){
        return false;
    }
    if(min && length <min){
        return false;
    }
    return true;
}
function checkNumber (value){
    if(!value){
        return false;
    }
    if(isNaN(value)){
        return false
    }
    return true;
}
function checkNumberRange(value, min, max){
    if(!value){
        return false;
    }
    if(isNaN(value)){
        return false;
    }
    value = parseFloat(value)
    if(value<min){
        return false;
    }
    if(value>max){
        return false
    }
    return true;
}
function  checkCointainsNumber(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const re=/^[0-9]{1,3}[0-9]*[a-zA-Z]*$/;
    return re.test(value)
}
function checkMobilePhone(value){
    if(!value){
        return false
    }
    value = value.toString().trim()
    const re=/\+?^[0-9]+$/;
    return re.test(value)
}
function checkEmail(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value)
}
function checkDate(value){
    if(!value){
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    value = value.toString().trim()
    console.log(value + '')
    return pattern.test(value)
}
function checkDateIfAfter(value,compareTo){
    if(!value){
        return false;
    }
    if(!compareTo){
        return false
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if(!pattern.test(value)){
        console.log('f1')
        return false;
    }
    if(!pattern.test(compareTo)){
        console.log('f2')
        return false;
    }
    const valueDate = new Date(value);
    const comparetoDate = new Date(compareTo);
    console.log(valueDate.getTime() + ' ' + comparetoDate.getTime())
    if(valueDate.getTime() > comparetoDate.getTime()){
        return false;
    }
    return true;
}
function checkCheckbox(value){
    if(!value || value !== "on"){
        return false;
    }
    return true
}