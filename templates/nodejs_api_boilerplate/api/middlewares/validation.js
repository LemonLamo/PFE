const Validator = require('validatorjs');

// To add translations later on
const validationMessages = {

}

exports.validate = (req, res, next, rules) => {
    const validation = new Validator(req.body, rules, validationMessages);
    validation.check();
    let errors = validation.errors.all() || null;

    if (Object.keys(errors).length != 0)
        return res.status(400).json({ errorCode: "validation-error", errorMessage: "Supplied is not conform to validation rules.", errors: errors });
    else
        next()
}