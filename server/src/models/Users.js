const {Schema, model} = require('mongoose');
const Joi = require('joi');

const userJoiSchemaRegister = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    role: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
});

const userJoiSchemaLogin = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

});

const userJoiSchemaChangePassword = Joi.object({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

});


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    role: {
        type: String,
        required: true,
        unique: false,
    },
}, {timestamps: {createdAt: 'created_date'}})


const User = model('User', UserSchema)

module.exports = {
    User,
    userJoiSchemaRegister,
    userJoiSchemaLogin,
    userJoiSchemaChangePassword
};

