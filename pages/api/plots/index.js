import dbConnect from '../../../utils/dbConnect'
import Plots from "../../../models/Plots";

export default async function handler(req, res) {
    const { method } = req

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const pets = await Plots.find({}) /* find all the data in our database */
                res.status(200).json({ success: true, data: pets })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const plot = await Plots.create(
                    req.body
                ) /* create a new model in the database */
                res.status(201).json({ success: true, data: plot })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
