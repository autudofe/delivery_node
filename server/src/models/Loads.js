const {Schema, model} = require('mongoose');
const Joi = require('joi');

const LoadJoiSchemaAddLoad = Joi.object({
    name: Joi.string()
        .min(2)
        .required(),

    payload: Joi.number()
        .required(),

    pickup_address: Joi.string()
        .min(2)
        .required(),

    delivery_address: Joi.string()
        .min(2)
        .required(),

    dimensions: {
        width: Joi.number().required(),
        length: Joi.number().required(),
        height: Joi.number().required(),
    },

});


const LoadSchema = new Schema({

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
        default: 'NEW',
    },
    state: {
        type: String,
        required: false,
        unique: false,
        default: null,
    },
    name: {
        type: String,
        required: true,
        unique: false,
    },
    payload: {
        type: Number,
        required: true,
        unique: false,
    },
    pickup_address: {
        type: String,
        required: true,
        unique: false,
    },
    delivery_address: {
        type: String,
        required: true,
        unique: false,
    },
    dimensions: {
        width: {type: Number, required: true},
        length: {type: Number, required: true},
        height: {type: Number, required: true}
    },
    logs: [
        {
            message: {type: String, required: true},
            time: {type: String, required: true},
        }
    ],

}, {timestamps: {createdAt: 'created_date'}})


const Load = model('Load', LoadSchema)

module.exports = {
    Load,
    LoadJoiSchemaAddLoad,
};

