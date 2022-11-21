function validateForm(){
    const streetInput = document.getElementById('ulica');
    const buildingInput = document.getElementById('numerBudynku');
    const flatInput = document.getElementById('numerMieszkania');
    const devInput = document.getElementById('stanDeweloperski');
    const errorStreet = document.getElementById('errorStreet');
    const errorBuilding = document.getElementById('errorBuilding')
    const errorFlat = document.getElementById('errorFlat')
    const errorDev = document.getElementById('devStateError')
    const errorsSummary = document.getElementById('errorsSummary')
    const errorMessageSummary = document.getElementById('errorMessage-summary').innerText
    const errorMessageRequired = document.getElementById('errorMessage-required').innerText
    const errorMessageStreetRange = document.getElementById('errorMessage-streetRange').innerText
    const errorMessageBuildingRange = document.getElementById('errorMessage-buildingRange').innerText
    const errorMessageBuildingNumber = document.getElementById('errorMessage-buildingNumber').innerText
    const errorMessageFlatNumber = document.getElementById('errorMessage-flatNumber').innerText
    const errorMessageFlatRange = document.getElementById('errorMessage-flatRange').innerText
    const errorMessageDevState = document.getElementById('errorMessage-devState').innerText

    resetErrors([streetInput,buildingInput,flatInput],[errorStreet,errorBuilding,errorFlat],errorsSummary);
    let valid = true;
    if(!checkRequired(streetInput.value)){
        valid = false;
        streetInput.classList.add("error-input");
        errorStreet.innerText = errorMessageRequired;
    }else if(!checkTextLengthRange(streetInput.value,2,20)){
        valid = false;
        streetInput.classList.add("error-input");
        errorStreet.innerText = errorMessageStreetRange;
    }
    if(!checkRequired(buildingInput.value)){
        valid = false;
        buildingInput.classList.add("error-input");
        errorBuilding.innerText = errorMessageRequired;
    }else if(!checkTextLengthRange(buildingInput.value,1,3)){
        valid = false;
        buildingInput.classList.add("error-input");
        errorBuilding.innerText = errorMessageBuildingRange;
    }else if(!checkCointainsNumber(buildingInput.value)) {
        valid = false;
        buildingInput.classList.add("error-input");
        errorBuilding.innerText = errorMessageBuildingNumber;
    }
    if(!checkRequired(flatInput.value)){
        valid = false;
        flatInput.classList.add("error-input");
        errorFlat.innerText = errorMessageRequired;
    }else if(isNaN(flatInput.value)){
        valid = false;
        flatInput.classList.add("error-input");
        errorFlat.innerText = errorMessageFlatNumber;
    }else if(!checkNumberRange(flatInput.value,1,999)){
        valid = false;
        flatInput.classList.add("error-input");
        errorFlat.innerText = errorMessageFlatRange;
    }
    if(!checkCheckbox(devInput.value)){
        console.log(devInput.value)
        valid = false;
        devInput.classList.add("error-input");
        errorDev.innerText = errorMessageDevState
    }
    if(!valid){
        errorsSummary.innerText = errorMessageSummary
    }
    return valid;
}