const response = {
    success: (res, data, message = "Success", code = 200) => {
        return res.status(code).json({
            status: "success",
            message,
            data,
        });
    },
    error: (res, message = "Internal server error", code = 500) => {
        return res.status(code).json({
            status: "error",
            message,
        });
    },
};

module.exports = response;
