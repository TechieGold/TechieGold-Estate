import { errorHandler } from "../utils/error.js";
import User from '../models/user.model.js';

export const test = async(req, res) => {
    res.json({ "message": "Api is working" });
}

export const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your own account'));
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true });
        const {password, ...rest} = updatedUser._doc;

        res.status(201).json(rest);
        
    } catch (error) {
        next(error);
    }
}
