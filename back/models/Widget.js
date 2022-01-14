const mongoose = require('mongoose');

const WidgetSchema = mongoose.Schema({
    code: {
        type: String
    },
    name: {
        type: String
    },
    service: {
        type: String
    },
    config: {
        type: Object
    },
    refreshRate: {
        type: Number,
    }
})

module.exports = {
    WidgetSchema: WidgetSchema,
    WidgetModel: mongoose.model('Widget', WidgetSchema, 'Widget')
}