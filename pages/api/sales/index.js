import dbConnect from '../../../utils/dbConnect';
import Sales from "../../../models/Sales";

export default async function handler(req, res) {
    const { method } = req

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const sales = await Sales.find({}).sort({"createdAt": -1}) /* find all the data in our database */
                res.status(200).json({ success: true, data: sales })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const sales = await Sales.create(
                    req.body
                ) /* create a new model in the database */
                res.status(201).json({ success: true, data: sales })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
