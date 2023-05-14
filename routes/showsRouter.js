const express = require("express");
const {Router} = express;
const {User, Show} = require("../models");
const { where } = require("sequelize");

const showsRouter = Router();


showsRouter.get("/", async(req, res) => {
    const shows = await Show.findAll();
    res.json(shows);
})

showsRouter.get("/:id", async(req, res) => {
    const {id} = req.params;
    const show = await Show.findByPk(id);
    res.json(show);
})


showsRouter.get("/genre/:genre", async(req,res) => {
    const {genre} = req.params;
   const shows = await Show.findAll({where: {genre: genre}})
   res.json(shows)

    })


showsRouter.put("/:id", async(req, res) => {
    const {id} = req.params
    const show = await Show.findByPk(id);
    if (req.body.status) {
        show.status = req.body.status;
        res.json(show)

    }
    else {
        res.json(404);
    }
   
})


showsRouter.delete("/:id", async (req,res) => {
    const shows = await Show.findAll();
    const {id} = req.params;
    const deletedShow = await Show.destroy(id);
    res.json(shows);
})




showsRouter.put("/:id", async(req, res) => {
    const {id} = req.params;
    const show = await Show.findByPk(id);
    if (req.body.rating) {
    show.rating = req.body.rating;
    res.json(show);
    }
    else {
        res.sendStatus(404);
    }
    
})

module.exports = {showsRouter};
