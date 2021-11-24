import {Fragment} from "react";

const discountValidation = (values) => {

    let errors = {};

    if(!values.name){
        errors.name = "Name Required"
    }
    if(!values.percent){
        errors.percent = "Percent is required"
    }
    if(isNaN(values.percent)){
        errors.percent = "Number required"
    }

    return errors;
}

export default discountValidation;