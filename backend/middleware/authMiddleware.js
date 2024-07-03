import jwt from 'jsonwebtoken';
import User from '../model/userModel.js'

const protect = async (req, res, next) => {
    try {
        let token;
        token = req.cookies.jwt;
        console.log(token,"token")
        if(token) {
            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.userId).select('-password');
                next();
            } catch {
                res.status(401).json({ error: "Not authorized, Invalid token" });
                console.log("Not authorized, Invalid token")
            }
        } else {
            res.status(401).json({ error: "Not authorized, No token" });
            console.log("Not authorized, No token");
        }
    } catch(err){
        console.log(err)
        res.status(500).json({ message: error.message });
    }
}

export {protect}