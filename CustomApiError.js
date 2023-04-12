class CustomApiError extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

function craeteCustomApiError(message, status) {
    return new CustomApiError(message, status)
}

module.exports = craeteCustomApiError