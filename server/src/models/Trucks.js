const {Schema, model} = require('mongoose');


const TruckSchema = new Schema({
    created_by: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: false,
    },
    assigned_to: {
        type: Schema.Types.ObjectId,
        required: false,
        unique: false,
        default: null,
    },
    status: {
        type: String,
        required: true,
        unique: false,
        default: 'IS'
    },
    type: {
        type: String,
        required: true,
        unique: false,
    },
}, {timestamps: {createdAt: 'created_date'}})


const Truck = model('Truck', TruckSchema)

module.exports = {
    Truck,
};

