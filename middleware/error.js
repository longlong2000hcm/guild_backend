module.exports = (err, req, res, next) => {
    switch (err.name) {
        case 'ValidationError':
            return res.status(422).json({
                error: err.message.toString(),
                success: false
            })
        case 'CastError':
            return res.status(422).json({
                error: err.message.toString(),
                success: false
            })
        case 'SyntaxError':
            return res.status(400).json({
                error: 'Syntax Error',
                success: false
            })
    }
}