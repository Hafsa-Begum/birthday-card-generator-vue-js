const Card = require("../models/cards");
const cards = require("../models/cards");
const fs = require("fs");

module.exports = class API {
    //fetch all cards
    static async fetchAllCard(req, res) {
        try {
            const cards = await Card.find();
            res.status(200).json(cards);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    //fetch all sorted cards
    static async fetchSortedCard(req, res) {
        try {
            const cards = await Card.find().sort({ birthday: -1 });
            console.log(cards)
            res.status(200).json(cards);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    //fetch card by ID
    static async fetchCardById(req, res) {
        const id = req.params.id;
        try {
            const card = await Card.findById(id);
            res.status(200).json(card);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    //create a card
    static async createCard(req, res) {
        const card = req.body;
        const imagename = req.file.filename;
        console.log(imagename)
        card.image = imagename;
        try {
            const newCard = await Card.create(card);
            res.status(201).json({ message: "Card created successfully", newCard })
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    //update card
    static async updateCard(req, res) {
        const id = req.params.id;
        let new_image = "";
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync("./uploads/" + req.body.old_image);
            } catch (err) {
                console.log(err.message)
            }
        } else {
            new_image = req.body.old_image;
        }
        const newCard = req.body;
        newCard.image = new_image;
        try {
            await Card.findByIdAndUpdate(id, newCard);
            res.status(200).json({ message: "Card updated successfully" })
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    //delete a card
    static async deleteCard(req, res) {
        const id = req.params.id;
        try {
            const result = await Card.findByIdAndDelete(id);
            if (result.image != "") {
                try {
                    fs.unlinkSync("./uploads/" + result.image);
                } catch (err) {
                    console.log(err.message);
                }
            }
            res.status(200).json({ message: "Card deleted successfully" })
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}