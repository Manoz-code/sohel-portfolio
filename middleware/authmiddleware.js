import jwt from "jsonwebtoken";


export const protect = (req, res, next) => {
    // Expecting token like: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store admin info in req
        req.admin = decoded;  // ✅ This is how controller can access admin

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalid" });
    }
};