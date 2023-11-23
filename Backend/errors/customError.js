class CustomError extends Error {
    constructor(message,status=500) {
        super(message)
        this.status=status
    }
}

const createError=(message,status) => new CustomError(message,status)

module.exports={createError,CustomError}