const userModel = require('../models/user.models');

const allUsers = async( req, res) => {
    try{
        const usersDetails = await userModel.find({});
        return res.status(200)
        .json({
            status: 200,
            data: usersDetails
        })
    } catch(err){
        return res.status(500)
        .json({
            message: err.message,
            status: 500
        });
    };
};

const dataById = async(req, res) => {
    const gmail = req.body.email;
    try{
        const oneUser = await userModel.findOne({email: gmail});
        return res.status(200)
        .json({
            status: 200,
            data: oneUser
        });
    } catch(err) {
        console.log(err);
        return res.status(500)
        .json({
            status: 500,
            message: err.message
        });
    };
};

module.exports = {
    allUsers,
    dataById
};