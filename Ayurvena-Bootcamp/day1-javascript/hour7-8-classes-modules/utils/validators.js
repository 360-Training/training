function ValidateDate(date){
    const ParseDate = new Date(date);
    if (!isNaN(ParseDate.getTime())){
        return { valid: true};
    }
    return {
        valid: false,
        error: "Invalid date format."
    };
}

function ValidateEmail(email){
    if(email.includes("@") && email.includes(".")){
        return { valid: true};
    }
    return {
        valid: false,
        error: "Invalid email address."
    };
}

function ValidatePhone(phone){
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneRegex.test(phone)){
        return {valid:true};
    }
    return {
        valid : false,
        error : "Phonenumber must be in exactly 10 digits."
    };
}

module.exports = {
    ValidateDate,
    ValidateEmail,
    ValidatePhone
};

console.log("1. Validation of Date (Valid)");
console.log(ValidateDate("2026-06-17"));
console.log("\n2 Validation of Date (Invalid)");
console.log(ValidateDate("32-14-2026"));
console.log("\n3.Validation of Email (Valid)");
console.log(ValidateEmail("srinitha@gmail.com"));
console.log("\n4.Validation of Email (Invalid)");
console.log(ValidateEmail("srinithagmail.com"));
console.log("\n5. Validation of Phone (Valid)");
console.log(ValidatePhone(9515921471));
console.log("\n6.Validation of Phone (Invalid)");
console.log(ValidatePhone(986759476));