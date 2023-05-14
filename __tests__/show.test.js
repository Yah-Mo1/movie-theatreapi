// const express = require("express");
const {Show, User} = require("../models");
// const { db, DataTypes } = require("../db");
const syncSeed = require("../seed");
const {app} = require("../src/app.js");
const request = require("supertest");

let userQuantity;
let showsQuantity;

beforeEach(async() => {
    await syncSeed;
    const users = await User.findAll();
    const shows = await Show.findAll();
     userQuantity = users.length;
     showsQuantity = shows.length;
})



describe("testing for shows", ()=> {
    //tests passes
    test("testing for all shows", async() => {
    const response = await request(app).get("/shows")
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("rating");
    expect(response.body.length).toEqual(showsQuantity)
    })


    test("getting one show", async() => {
        //test passes
        const response = await request(app).get("/shows/1")
        expect(response.body.id).toBe(1);
    })

    test("getting a show of a particular genre", async() => {
        const response = await request(app).get("/shows/genre/Comedy")
        for (let show of response.body) {
            expect(show.genre).toBe("Comedy")
        }
        //response.body is an array -> for loop through each object to confirm taht every object has property genre set to comedy
        //expect for every single object of shows to have the property genre set to comedy
        // expect(response.body.every((genre))).toBe("Comedy")
        // expect(response.body.every(genre)).toBe("Comedy")

        //test passes
    })


    test.skip("updating rating of a show", async() => {
        //how do i update the status of a show thats been watched???
        const response = await request(app).put("/shows/2").send({"rating": 5})
        expect(response.body.rating).toBe(5);

    })
    test.skip("updating rating of a show which is null or contains whitespace", async() => {
        //how do i update the status of a show thats been watched???
        const response = await request(app).put("/shows/2").send()
        expect(response.statusCode).toBe(404);

    })

    test("updating the status of a show", async() => {
        const response = await request(app).put("/shows/2").send({"status": "cancelled"})
        expect(response.body.status).toBe("cancelled");
        //test passes

    })
    test.skip("updating the status of a show which is null", async() => {
        const response = await request(app).put("/shows/2").send()
        expect(response.statusCode).toBe(400);
        //test passes

    })


    test.skip("deleting a show", async() => {
        await request(app).delete("/shows/11");
        const shows = await Show.findAll();
        expect(shows.length).toEqual(showsQuantity - 1)
    }, 70000)


    
})

