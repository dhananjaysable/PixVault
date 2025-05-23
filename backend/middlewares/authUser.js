import jwt from 'jsonwebtoken'
export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required!"
            })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log();
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired Token!"
            })
        }
        req.user = {
            userId: decodedToken.id
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        })
    }
}