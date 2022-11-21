function errMessages(errors){
    errors.forEach(err=>{
        console.log(err)
        switch(err.code){
            case "string.empty":
                err.message = "Pole jest wymagane"
                break;
            case "string.min":
                err.message = `Pole powinno zaiwerać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zaiwerać co najwyżej ${err.local.limit} znaki`
                break;
            case "number.min":
                err.message = `Wartość nie może być mniejsza niż ${err.local.limit}`;
                break;
            case "number.max":
                err.message = `Wartość nie może być większa niż ${err.local.limit}`;
                break;
            case "number.base":
                switch (err.local.key){
                    case "flat":
                        err.message = "Proszę wybrać mieszkanie";
                        break;
                    case "client":
                        err.message = "Proszę wybrać klienta";
                        break;
                    default:
                        err.message = `Pole powinno zawierać liczbę`;
                        break;
                }
                break;
            case "string.email":
                err.message = "Pole powinno zawierać prawidłowy adres email";
                break;
            case "date.base":
                err.message = "Proszę wybrać datę"
                break;
            case "date.max":
                err.message = "Data nie może być z przyszłości"
                break;
            case "string.pattern.base":
                switch (err.local.key){
                    case "numerBudynku":
                        err.message = "Prosze wprowadzić prawidłowy numer budynku";
                        break;
                    case "numerTelefonu":
                        err.message = "Prosze wprowadzić prawidłowy numer telefonu";
                        break;
                    case "DataKupna":
                        err.message = "Proszę wprowadzić poprawną datę"
                        break;
                    case "stanDeweloperski":
                        err.message = "Pole musi pozostać checkboxem"
                        break;
                    default:
                        break;
                }
            default:
                break;
        }
    });
    return errors
}
module.exports = errMessages