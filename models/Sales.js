import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const SalesSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: [true, 'Please provide owner name.'],
    },
    category: {
        type: String,
        required: [true, 'Please provide category.'],
    },
    sectorNo: {
        type: String,
        required: [true, 'Please provide sector no.'],
    },
    roadNo: {
        type: String,
        required: [true, 'Please provide road no.'],
    },
    plotNo: {
        type: String,
        required: [true, 'Please provide plot no.'],
    },
    plotSize: {
        type: String,
        required: [true, 'Please provide plot size.'],
    },
    price: {
        type: String,
        required: [true, 'Please provide price.'],
    },
    contactNo: {
        type: String,
        required: [true, 'Please provide contact no.'],
    },
}, { timestamps: true });

export default mongoose.models.Sales || mongoose.model('Sales', SalesSchema);
