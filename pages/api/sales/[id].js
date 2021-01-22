import dbConnect from '../../../utils/dbConnect';
import Sales from '../../../models/Sales';

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET' /* Get a model by its ID */:
            try {
                const sales = await Sales.findById(id)
                if (!sales) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: sales })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT' /* Edit a model by its ID */:
            try {
                const sales = await Sales.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!sales) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: sales })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'DELETE' /* Delete a model by its ID */:
            try {
                const deletedSale = await Sales.deleteOne({ _id: id })
                if (!deletedSale) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}
