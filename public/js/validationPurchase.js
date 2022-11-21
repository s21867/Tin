function validateForm(){
    const clientInput = document.getElementById('client')
    const flatInput = document.getElementById('flat')
    const dateInput = document.getElementById('DataKupna')
    const priceInput = document.getElementById('CenaKupna')
    const errorClient = document.getElementById('errorClient')
    const errorFlat = document.getElementById('errorFlat')
    const errorDate = document.getElementById('errorDate')
    const errorPrice = document.getElementById('errorPrice')
    const errorsSummary = document.getElementById('errorsSummary')
    const errorMessageRequired = document.getElementById('errorMessage-required').innerText
    const errorMessageSummary = document.getElementById('errorMessage-summary').innerText
    const errorMessageClient = document.getElementById('errorMessage-client').innerText
    const errorMessageFlate = document.getElementById('errorMessage-flat').innerText
    const errorMessageDate = document.getElementById('errorMessage-date').innerText
    const errorMessageDateIfAfter = document.getElementById('errorMessage-dateIfAfter').innerText
    const errorMessagePrice = document.getElementById('errorMessage-price').innerText
    const errorMessagePriceRange = document.getElementById('errorMessage-priceRange').innerText
    resetErrors([clientInput,flatInput,dateInput,priceInput],[errorClient,errorFlat,errorDate,errorPrice],errorsSummary)
    let valid = true;
    if(!checkNumber(clientInput.value)){
        valid = false;
        clientInput.classList.add("error-input");
        errorClient.innerText = errorMessageClient;
    }
    if(!checkNumber(flatInput.value)){
        valid = false;
        flatInput.classList.add("error-input");
        errorFlat.innerText = errorMessageFlate;
    }
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth()+1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();
    if(month.length<2)
        month = '0' + month;
    if(day.length < 2)
        day = '0' + day;
    const nowString = [year,month,day].join('-');
    if (!checkRequired(dateInput.value)){
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = errorMessageRequired;
    }else if(!checkDate(dateInput.value)){
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = errorMessageDate;
    }else if(!checkDateIfAfter(dateInput.value,nowString)){
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = errorMessageDateIfAfter;
    }
    if(!checkRequired(priceInput.value)){
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = errorMessageRequired;
    }else if(!checkNumber(priceInput.value)){
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = errorMessagePrice;
    }else if(!checkNumberRange(priceInput.value,0,20000000)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = errorMessagePriceRange;
    }
    if(!valid){
        errorsSummary.innerText = errorMessageSummary
    }
    return valid;
}