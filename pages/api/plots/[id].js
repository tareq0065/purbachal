import dbConnect from '../../../utils/dbConnect'
import Plots from '../../../models/Plots'

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET' /* Get a model by its ID */:
            try {
                const plot = await Plots.findById(id)
                if (!plot) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: pet })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'PUT' /* Edit a model by its ID */:
            try {
                const plot = await Plots.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                })
                if (!plot) {
                    return res.status(400).json({ success: false })
                }
                res.status(200).json({ success: true, data: plot })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        case 'DELETE' /* Delete a model by its ID */:
            try {
                const deletedPlot = await Plots.deleteOne({ _id: id })
                if (!deletedPlot) {
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
