module.exports = {
    send: (err, req, res, code = 400)=>{
        console.log(`err: ${err}`);
        res.status(code).json({
            error:err
        });
    }
};