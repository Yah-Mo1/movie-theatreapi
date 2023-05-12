// const express = require("express");
const {Show, User} = require("../models");
// const { db, DataTypes } = require("../db");
const syncSeed = require("../seed");
const {app} = require("./src/app.js");
const request = require("supertest");



beforeEach(async() => {
    await seed();
    const users = await User.findAll();
    const shows = await Show.findAll();
    const userQuantity = users.length;
    const showsQuantity = shows.length;
})



describe("testing for shows", async() => {
    test("testing for all shows", async() => {
    const response = await request(app).get("/shows")
    expect(response.body.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("rating");
    expect(response.body.length).toEqual(showsQuantity)
    })


    test("getting one show", async() => {
        const response = await request(app).get("/shows/1")
        expect(response.body.id).toBe(1);
    })

    test("getting a show of a particular genre", async() => {
        const response = await request(app).get("/shows/Comedy")
        //response.body is an array -> for loop through each object to confirm taht every object has property genre set to comedy
        //expect for every single object of shows to have the property genre set to comedy
        expect(response.body.every(({genre}))).toBe("Comedy")
    })


    test("updating rating of a show", async() => {
        //how do i update the status of a show thats been watched???

    })

    test("updating the status of a show", async() => {
        const response = await request(app).put("/shows/2").send({"status": "cancelled"})
        expect(response.body.status).toBe("cancelled");

    })


    test("deleting a show", async() => {
        const response = await request(app).get("/shows/2")
        expect(response.body.length).toBe(showsQuantity - 1)
    })


    
})

