const userModel = require('../models/user.models');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const tokenlib = require('../lib/token');

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const validatewithJoi = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    let loginValidate = validatewithJoi.validate(req.body);
    if(loginValidate.error) {
        return res.status(204)
        .send({
            message: loginValidate,
            status: 204
        });
    } else {
        loginValidate = loginValidate.value;
    };
    const oneUser = await userModel.findOne({email: loginValidate.email});
    if(!oneUser) {
        return res.status(204)
        .send({
            message: 'username or email is wrong',
            status: 204
        });
    } else {
        console.log();
    };
    try {
        const comparePassword = await bcrypt.compare(loginValidate.password, oneUser.password);
        const tokenpayload = {
            id: oneUser._id
        };
        const generatingToken = await tokenlib.createToken(tokenpayload);
        console.log(generatingToken, "LLLLLLL");
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
        console.log(error.message);
        return res.status(500)
        .send({
            message: error.message,
            status: 500
        });
    };
};