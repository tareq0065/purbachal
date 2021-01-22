import dbConnect from '../../../utils/dbConnect';
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export const config = {
    api: {
        externalResolver: true,
    },
}

export default async function handler(req, res) {
    const { method } = req;
    const {username, password} = req.body;

    await dbConnect();
    switch (method) {
        case 'POST':
            console.log('log-user2', method);
            try {
                const user = await User.find({username: username});
                if (user) {
                    bcrypt.compare(password, user[0].password, function(err, isMatch) {
                        if (isMatch) {
                            res.status(200).json({ success: true, data: user[0] });
                            res.end();
                        }
                        else {
                            res.status(400).json({ success: false, data: err });
                            res.end();
                        }
                    });
                }
                else {
                    res.status(400).json({ success: false, msg: "Username and password doesn't found." });
                    res.end();
                }
            } catch (error) {
                res.status(400).json({ success: false, err: error });
                res.end();
            }
            break
        default:
            res.status(400).json({ success: false });
            res.end();
            break
    }
}
