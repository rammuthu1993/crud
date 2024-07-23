const {logEvents} = require("./logger")

const errorHandler = (err,req,res,next)=>{
    logEvents(`${err.name}\t${err.message}\t${req.method}${req.url}\t${req.headers.origi}`,"reqLog.log")

    const status = res.statusCode ? res.statusCode : 500

    res.status(status)
    res.json({message:err.message,isError:true})
    next()
}

module.exports = errorHandler;