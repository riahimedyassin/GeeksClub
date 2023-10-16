const lazyResponse = (res,message,status,data) => {
    return res.status(status).json({
        message,
        status,
        data ,
        done : data.length===0
    })
}

module.exports={lazyResponse}