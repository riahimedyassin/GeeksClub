const response=(res,message,status,token=false,data) => {
    if(token) {
        return res.status(status).json({message,token : data,status : 200})
    }
    if(data) {
        return res.status(status).json({message,status,data})
    }
    return res.status(status).json({message,status})
}


module.exports={response}