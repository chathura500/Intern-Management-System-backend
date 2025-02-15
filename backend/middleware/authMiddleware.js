const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "ACCESS DENIED: NO TOKEN" });

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified; // Attach user data (id, username, role) to request
        next();
    } catch (err) {
        return res.status(403).json({ message: "INVALID TOKEN" });
    }
};

// Middleware for role-based protection
const verifyRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: `ACCESS DENIED: YOU DO NOT HAVE ${role.toUpperCase()} ACCESS` });
        }
        next();
    };
};

module.exports = { verifyToken, verifyRole };
