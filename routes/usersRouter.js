const express = require("express");
const {Router} = express;
const {User, Show} = require("../models");

const usersRouter = Router();



usersRouter.get("/:id", async(req, res) => {
    const {id} = req.params;
    const user = await User.findByPk(id);
    res.json(user);

})

usersRouter.get("/", async(req, res) => {
    const users = await User.findAll();
    res.json(users);
})

usersRouter.get("/:id/shows", async(req, res) => {
    const {id} = req.params;
    const user = await User.findByPk(id, {include: Show});
    res.json(user.shows);

})

usersRouter.put("/:id/shows/:showid", async(req, res) => {
    const {id, showid} = req.params;


    const user = await User.findByPk(id, {include: Show});
    const userShow = await Show.findByPk(showid);
    await user.addShows(userShow);

    res.json(user.shows);

})







module.exports = {usersRouter}