// const express = require("express");
const {Show, User} = require("../models");
// const { db, DataTypes } = require("../db/connection.js");
const{describe, expect, test} = require("@jest/globals")
const syncSeed = require("../seed");
const {app} = require("../src/app.js");
const request = require("supertest");

let usersQuantity;
let showsQuantity;

beforeEach(async() => {
    await syncSeed;
    const users = await User.findAll();
    const shows = await Show.findAll();
    usersQuantity = users.length;
    showsQuantity = shows.length;
})




describe("testing for users", () => {

    test("testing for all users", async() => {
    const response = await request(app).get("/users")
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("username");
    expect(response.body.length).toBe(usersQuantity)
    //successful test
    })

    test("testing for one user", async() => {
        const response = await request(app).get("/users/1")
        expect(response.body.id).toBe(1);
        //successful test

    })

    test("testing for all shows watched by a user", async() => {
        const response = await request(app).get("/users/1/shows")
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty("title");
    })

    test("testing for updating and adding a show", async() => {
        //well come back to this one --> putting and adding a show?? surely itd be both post and put methods used here

        const response = (await request(app).put("/users/1/shows/2"))
        expect(response.statusCode).toBe(200)

    })
})