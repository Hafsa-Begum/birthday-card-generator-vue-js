const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
    name: { type: String, required: true },
    birthday: { type: Date, required: true },
    image: { type: String, required: true },
},
    {
        timestamps: true
    }
)
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;