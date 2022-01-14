const mongoose = require('mongoose');
const AuthSchema = require('./Auth');
const servicesSchema = require('./Services');
const {WidgetSchema} = require('./Widget');

const UserSchema = mongoose.Schema({
    auth: {
        type: AuthSchema
    },
    services: servicesSchema,
    widgets: {
        type: [WidgetSchema],
        default:[]
    }
});

module.exports = mongoose.model('User', UserSchema, 'User');