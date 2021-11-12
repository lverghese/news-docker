const { Schema } = require('mongoose');

const planSchema = new Schema({
    id: {
        type: Interger,
        required: true
    },
    plan_name: {
        type: String,
        required: true
    },
    exercises: {
        type: Exercise
    }
});

module.exports = planSchema;