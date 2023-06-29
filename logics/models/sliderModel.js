const mongoose = require('mongoose');
const sliderSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
        src:{
            type: String,
            required: false
        },
        titre:{
            type: String,
            required: true
        },
        texte:{
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            required: true
        },
        updatedAt:{
            type: Date,
            required: true
        },
    },
    {
        timesTamps: true
    }
);
const Slider = mongoose.model('slider', sliderSchema);
module.exports = Slider;
