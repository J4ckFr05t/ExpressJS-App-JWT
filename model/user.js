const mongoose = require('mongoose')
var DateOnly = require('mongoose-dateonly')(mongoose)
var uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useCreateIndex', true);

const MachineSchema = new mongoose.Schema({
    idcard : {
        type : String,
        required : true
    },
    machine : {
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    createdAt: {type: Date,
        default: Date.now
    }
})

MachineSchema.plugin(uniqueValidator)

module.exports = MachineInfo = mongoose.model('MachineSchema',MachineSchema)