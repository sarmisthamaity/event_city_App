const userModel = require('../models/user.models');
const eventModel = require('../models/event.model');
const Joi = require('joi');

const adminGetData = async (req, res) => {
    const findAdmin = await userModel.findOne({ Name: req.body.Name });
    try {
        if (findAdmin.role === "admin") {
            const allUsers = await userModel.find({});
            return res.status(200)
                .json({
                    status: 200,
                    datas: allUsers
                });
        };
    } catch (err) {
        return res.status(500)
            .json({
                message: err.message,
                status: 500
            });
    };
};


const userWithEvents = async (req, res) => {
    const admin = await userModel.findOne({ Name: req.body.name })
    try {
        if (admin.role === "admin") {
            const oneUser = await eventModel
                .find({}, { "_id": 0, "__v": 0 })
                .populate({ path: 'description', select: { 'password': 0, "_id": 0, "__v": 0 } });
            return res.status(200)
                .json({
                    status: 200,
                    data: oneUser
                });
        }
    } catch (err) {
        console.log(err);
        return res.status(500)
            .json({
                status: 500,
                message: err.message
            });
    };
};


const eventGetByUser = async (req, res) => {
    const { Name, phoneNumber } = req.body;
    const dataValidateWithJoi = Joi.object({
        Name: Joi.string().required()
    });
    let validateData = dataValidateWithJoi.validate(req.body);
    if (validateData.error) {
        return res.status(204).json({
            status: 204,
            message: validateData.error
        });
    } else {
        validateData = validateData.value;
    };
    const existingUser = await userModel
        .findOne({ Name: Name});
    if (!existingUser) {
        return res.status(204).json({
            status: 204,
            message: 'user does not exists'
        });
    } else {

    };
    try {
        const allEvents = await eventModel
            .find({}, { "_id": 0, "__v": 0, "description": 0 });
        return res.status(200)
            .json({
                status: 200,
                message: allEvents
            });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            status: 500,
            error: err
        });
    };
};


module.exports = {
    adminGetData,
    userWithEvents,
    eventGetByUser
};