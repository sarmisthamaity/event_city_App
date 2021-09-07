const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    description: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

const eventModel = mongoose.model('event', eventSchema);

module.exports = eventModel;