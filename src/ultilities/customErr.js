class customError extends Error{
    constructor(message, statusCode ){
        super();
        this.message = message;
        this.statusCode =statusCode;
    }
}

let errHandel = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500
    if(err.type = "Validation error" ){
        res.status(400).json(err.message)
        return
    }
    res.status(err.statusCode).json({
        status: 'fail',
        message : err.message,
        err: err
    })
}

module.exports = {
    customError,
    errHandel
};