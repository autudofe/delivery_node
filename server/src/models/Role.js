const {Schema, model} = require('mongoose');

const Role = new Schema({
    value: {
        type: String,
        required: true,
        default: 'SHIPPER',
    }
},)


module.exports = model('Role', Role)

