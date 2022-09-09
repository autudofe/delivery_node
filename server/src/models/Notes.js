const mongoose = require('mongoose');


const noteSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {timestamps: {createdAt: 'createdDate'}});

const Note = mongoose.model('Note', noteSchema);

module.exports = {
    Note,
};


