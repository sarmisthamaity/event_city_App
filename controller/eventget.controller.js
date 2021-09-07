const eventModel = require('../models/event.model');

const sortByName = async (req, res) => {
    try {
        // sort by eventName
        const sortedName = await eventModel.find({}, )
            .sort({ eventName: req.body.name.startsWith('a' || 'A') })
        return res.status(200).send({
            status: 200,
            sortedData: sortedName
        })
    } catch (err) {
        return res.status(500).send(err)
    };
};




module.exports = {
    sortByName,
}