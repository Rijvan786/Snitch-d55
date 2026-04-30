import {parsePhoneNumberFromString} from "libphonenumber-js"

export const  validatedAndFormat  =(contact)=>{
    const parsed=parsePhoneNumberFromString(contact)
    
    if(!parsed || !parsed.isValid())return null;
    return parsed.number;
}