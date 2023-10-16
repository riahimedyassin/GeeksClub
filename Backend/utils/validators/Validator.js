class Validator {
    email(value) {
        return value.indexOf("@")!=-1 && value.indexOf(" ")==-1
    }
    password(value) {
        return value.charAt(0)===value.charAt(0).toUpperCase() && value.length>6 && value.indexOf(" ")!=-1
    }
}

module.exports={Validator}