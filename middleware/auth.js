const Jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try{
        let token = '';
        if(!req.headers.authorization){
            return res.status(401)
            .send({
                message: 'token is not found',
                status: 401
            });
        }
        if(req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        else {
            token = req.headers.authorization
        };
        const decoded = await Jwt.verify(token, process.env.SERECT_KEY);
        console.log(decoded);
        req.tokenData = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401)
        .send({
            error: 'Unauthorized',
            message: err.message,
            status: 401
        });
    };
};