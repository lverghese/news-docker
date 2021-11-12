const { Schema } = require('mongoose');

const exerciseSchema = new Schema({
    exercise_name: {
        type: String,
        required: true
    },
    setLength: {
        type: Integer,
        required: true
    },
    repLength: {
        type: Integer,
        required: true
    },
    workout_plan_id: {
        type: Plan
    },
    //do we even have to model day ? could be type: Day but kept as type: String for now
    day_id: {
        type: String
    }
});

module.exports = exerciseSchema;