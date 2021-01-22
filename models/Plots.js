import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const PlotsSchema = new mongoose.Schema({
    plotName: {
        type: String,
        required: [true, 'Please provide a name.'],
    },
    ownerName: {
        type: String,
    },
    available: {
        type: String,
        required: [true, 'Please provide quantity.'],
    },
    availability: {
        type: Boolean,
        default: true,
    },
    mobileNumber: {
        type: String,
    },
    imageUrls: {
        type: Array,
    },
}, { timestamps: true })

export default mongoose.models.Plots || mongoose.model('Plots', PlotsSchema)
