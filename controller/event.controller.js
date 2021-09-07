const eventModule = require('../models/event.model');
const Joi = require('joi');

const createEvent = async (req, res) => {
    // const eventSchema = Joi.object({
    //     eventName: Joi
    //         .string()
    //         .required(),
    //     description: Joi.string(),
    //     startDate: Joi.string()
    //         .required(),
    //     endDate: Joi
    //         .string()
    //         .required(),
    //     city: Joi
    //         .string()
    //         .required()
    // });
    const { eventName, descId, startDate, endDate, city } = req.body;
    // let eventValidate = eventSchema.validate(req.body);
    // if (eventValidate.error) {
    //     return res.status(400)
    //         .send({
    //             message: eventValidate.error,
    //             status: 400
    //         });
    // } else {
    //     eventValidate = eventValidate.value;
    // };
    try {
        const data = {
            eventName: eventName,
            description: descId,
            startDate: startDate,
            endDate: endDate,
            city: city
        };
        const createEventData = await eventModule.create(data);
        return res.status(200)
            .send({
                message: createEventData,
                status: 200
            });
    } catch (err) {
        return res.status(500)
            .send({
                message: 'internal serevr error' || err.message,
                status: 500
            });
    };
};


const updateEvent = async (req, res) => {
    const { eventName, startDate, endDate, city } = req.body;
    const { descId } = req.query;
    let validateWithJoi = Joi.object({
        eventName: Joi
            .string()
            .required(),
        startDate: Joi
            .string()
            .required(),
        endDate: Joi
            .string()
            .required(),
        city: Joi
            .string()
            .required()
    });
    let dataValidate = validateWithJoi.validate(req.body)
    if (dataValidate.error) {
        return res.status(204).json({
            status: 204,
            data: dataValidate.error
        });
    } else {
        dataValidate = dataValidate.value
    };
    const updatePayload = {
        eventName: eventName,
        startDate: startDate,
        endDate: endDate,
        city: city
    };
    try {
        const eventUpdate = await eventModule
            .findOneAndUpdate({ description: descId }, updatePayload)
            .populate({ path: 'description' });
        return res.status(200).send({
            right: "congrates",
            status: 200,
            data: eventUpdate
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            message: 'Internal error' || 'bad response'
        });
    };
};


const deleteData = async (req, res) => {
    const { descId } = req.body;
    try {
        const dataOfUser = await eventModule
            .findOne({ description: descId })
            .populate({ path: 'description' });
        await eventModule.remove(dataOfUser)
        return res.status(202).json({
            status: 202,
            message: 'data deleted'
        });
    } catch (err) {
        return res.status(500)
            .send({
                status: 500,
                message: 'internal error' || 'bad request'
            });
    };
};


module.exports = {
    createEvent,
    updateEvent,
    deleteData
};