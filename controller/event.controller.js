const eventModule = require('../models/event.model');
const Joi = require('joi');

module.exports.createEvent = async (req, res) => {
    const eventSchema = Joi.object({
        eventName: Joi
            .string()
            .required(),
        description: Joi
            .string()
            .required(),
        startDate: Joi.string()
            .required(),
        endDate: Joi
            .string()
            .required(),
        city: Joi
        .string()
        .required()
    });
    const {eventName, description, startDate, endDate,city} = req.body;
    let eventValidate = eventSchema.validate(req.body);
    if(eventValidate.error){
        return res.status(400)
        .send({
            message: eventValidate.error,
            status: 400
        });
    } else {
        eventValidate = eventValidate.value;
    };
    try{
        const data = {
            eventName: eventName,
            description: description,
            startDate: startDate,
            endDate: endDate,
            city: city
        };
        const createEventData = await eventModule.create(data);
        console.log(createEventData, "KKKKKKK");
        return res.status(200)
        .send({
            message: createEventData,
            status: 200
        });

    } catch (err) {
        console.log(err);
        return res.status(500)
        .send({
            message: 'internal serevr error' || err.message,
            status: 500
        });
    };
};