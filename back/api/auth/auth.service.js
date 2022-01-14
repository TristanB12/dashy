const bcrypt = require('bcryptjs');
const Joi = require('joi');

const isPasswordValid = async (password, encrypted) => {
    let valid = await bcrypt.compare(password, encrypted);

    return valid;
}

const encryptPassword = (password) => {
    let salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);

}

const checkCredentials = (credentials) => {
    let message = undefined;

    const filterSchema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().regex(
            new RegExp(/^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,32}$/)
        ),
        confirmPassword: Joi.any().valid(Joi.ref('password'))
    })
    const {error, value} = filterSchema.validate(credentials);
    if(error) {
        switch (error.details[0].context.key) {
            case 'email':
                    message = 'You must provide a valid email adress';
                break;
            case 'password':
                    message =`Your password should contains:<br>
                                - 8 to 32 characters<br>
                                - at least two letters (upper and lowercase)<br>
                                - one number<br>
                                - one special character`;
                break;
            case 'confirmPassword':
                    message = 'Passwords are different';
            default:
                    message = 'Invalid registration informations';
                break;
        }
    }
    return message;
}

module.exports = {
    isPasswordValid,
    encryptPassword,
    checkCredentials
}