// Central error handling
const errorHandling = (err, req, res) => {
    console.log(err.stack);
    res.status(500).json({
        status: 500,
        message: 'Something Wrong',
        error: err.message
    })
};

export default errorHandling;