"use strict";

const checkNameValue = function(name) {
    if(!name) return 1

    return 0

}

const checkEmailValue = function(email) {
    if(!email) return 1
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    
    let valid = reg.test(email);

    if( !valid ) return 2

    return 0

}

const checkTelValue = function(phone) {
    if(!phone) return 1
    
    return 0

}

const checkMessageValue = function(message) {
    if(!message) return 1

    return 0

}



export { checkNameValue, checkEmailValue, checkTelValue, checkMessageValue };