const userModel = require('../models/user.models');
const Joi = require('joi');
const bycrypt = require('bcrypt');
const tokenLib = require('../lib/token');


const signUp = async (req, res) => {
    const { Name, password, role, phoneNumber, email } = req.body;
    const userJoiValidation = Joi.object({
        Name: Joi
            .string()
            .required(),
        password: Joi
            .string()
            .required(),
        email: Joi
            .string()
            .email()
            .required(),
        phoneNumber: Joi
            .number()
            .required(),
        role: Joi
            .string()
            .optional()
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
                    status: 200,
                    saveUser
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


const login = async (req, res) => {
    const { email, password } = req.body;
    const validatewithJoi = Joi.object({
        email: Joi
            .string()
            .email()
            .required(),
        password: Joi
            .string()
            .required()
    });

    let loginValidate = validatewithJoi.validate(req.body);
    if (loginValidate.error) {
        return res.status(204)
            .send({
                message: loginValidate,
                status: 204
            });
    } else {
        loginValidate = loginValidate.value;
    };
    const oneUser = await userModel.findOne({ email: loginValidate.email });
    if (!oneUser) {
        return res.status(204)
            .send({
                message: 'username or email is wrong',
                status: 204
            });
    } else {

    };
    try {
        const comparePassword = await bycrypt.compare(loginValidate.password, oneUser.password);
        if (!comparePassword) {
            return res.status(204)
                .json({
                    message: 'username or password is wrong',
                    status: 204
                });
        } else {

        }
        const tokenpayload = {
            id: oneUser._id
        };
        const generatingToken = await tokenLib.createToken(tokenpayload);
        const userData = {
            token: generatingToken,
            name: oneUser.Name,
            email: oneUser.email,
            role: oneUser.role
        }
        return res.status(200)
            .send({
                message: 'login successfully',
                data: userData,
                status: 200
            });
    } catch (error) {
        console.log(error);
        return res.status(500)
            .send({
                message: error.message,
                status: 500
            });
    };
};

module.exports = {
    signUp,
    login
};