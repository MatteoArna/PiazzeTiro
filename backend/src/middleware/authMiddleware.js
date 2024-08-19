const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.roleId !== 1) {
        return res.status(403).json({ message: 'Access denied. You are not an admin.' });
    }
    next();
};

module.exports = { authenticate, isAdmin };
