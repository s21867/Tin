function validateForm(){
    const nameInput = document.getElementById('imie')
    const lastNameInput = document.getElementById('nazwisko')
    const emailInput = document.getElementById('email')
    const phoneInput = document.getElementById('numerTelefonu')
    const errorName = document.getElementById('errorFirstName')
    const errorLastName = document.getElementById('errorLastName')
    const errorEmail = document.getElementById('errorEmail')
    const errorPhone = document.getElementById('errorPhone')
    const errorsSummary = document.getElementById('errorsSummary')
    const errorMessageRequired = document.getElementById('errorMessage-required').innerText
    const errorMessageclientMobilePhone = document.getElementById('errorMessage-clientMobilePhone').innerText
    const errorMessageclientMobilePhoneRange = document.getElementById('errorMessage-clientMobilePhoneRange').innerText
    const errorMessageemail = document.getElementById('errorMessage-email').innerText
    const errorMessageemailRange= document.getElementById('errorMessage-emailRange').innerText
    const errorMessagenameRange = document.getElementById('errorMessage-nameRange').innerText
    const errorMessagelastNameRange = document.getElementById('errorMessage-lastNameRange').innerText
    const errorMessageSummary = document.getElementById('errorMessage-Summary').innerText

    console.log(errorMessageSummary)
    resetErrors([nameInput,lastNameInput,emailInput,phoneInput],[errorName,errorLastName,errorEmail,errorPhone],errorsSummary)
    let valid = true;
    if(!checkRequired(nameInput.value)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = errorMessageRequired;
    }else if(!checkTextLengthRange(nameInput.value,2,20)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = errorMessagenameRange;
    }
    if(!checkRequired(lastNameInput.value)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = errorMessageRequired;
    }else if(!checkTextLengthRange(lastNameInput.value,2,20)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = errorMessagelastNameRange;
    }
    if(!checkRequired(emailInput.value)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = errorMessageemail;
    }else if(!checkTextLengthRange(emailInput.value,2,50)){
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = errorMessageemailRange;
    }else if(!checkEmail(emailInput.value)){
        valid = false
        emailInput.classList.add("error-input");
        errorEmail.innerText = errorEmail;
    }

    if(!checkRequired(phoneInput.value)){
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = errorMessageRequired;
    }else if(!checkTextLengthRange(phoneInput.value,9,12)){
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = errorMessageclientMobilePhoneRange;
    }else if(!checkMobilePhone(phoneInput.value)){
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = errorMessageclientMobilePhone;
    }
    if(!valid){
        errorsSummary.innerText=errorMessageSummary
    }
    return valid;
}