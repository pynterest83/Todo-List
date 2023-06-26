const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case 400:
            res.status(400).json({ message: err.message });
            break;
        case 401:
            res.status(401).json({ message: err.message });
            break;
        case 403:
            res.status(403).json({ message: err.message });
            break;
        case 404:
            res.status(404).json({ message: err.message });
            break;
        default:
            res.status(500).json({ message: err.message });
            break;
    }
}
module.exports = errorHandler;