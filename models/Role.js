const { Schema, model, default: mongoose} = require('mongoose');

const rolesSchema = Schema({

    name: {
        type: String,
        require: true,
    }

}, {
    timestamps: true,
})

module.exports = mongoose.model("Role", rolesSchema);