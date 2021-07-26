const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(400)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    // get status code, if status code is 200 when error, make it 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: err.message,
        // stack if we are not in production
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

export  {notFound, errorHandler}