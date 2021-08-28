const userModel = require('../models/user.models');
const Joi = require('joi');
const bycrypt = require('bcrypt');

module.exports.signUp = async (req, res) => {
    const { Name, password, role, phoneNumber, email } = req.body;
    const userJoiValidation = Joi.object({
        Name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.number().required(),
        role: Joi.string().required()
    });
    let userValidator = userJoiValidation.validate(req.body);
    if (userValidator.error) {
        return res.status(304)
            .json({
                message: userValidator.error,
                status: 304
            });
    } else {
        userValidator = userValidator.value;
    };
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
        return res.status(200)
            .json({
                message: 'user already exists',
                status: 200
            });
    };

    try {
        const hashPassword = await bycrypt.hash(password, process.env.SALT);
        if (hashPassword) {
            const createuser = await new userModel({
                Name: Name,
                email: email,
                password: hashPassword,
                phoneNumber: phoneNumber,
                role: role
            });
            const saveUser = await userModel.create(createuser);
            return res.status(200)
                .send({
                    message: 'user saved',
                    status: 200
                });
        } else {
            return res.status(204)
                .send('password not same')
        }

    } catch (err) {
        console.log(err);
        return res.status(500)
            .json({
                message: err.message,
                status: 500
            });
    };
};