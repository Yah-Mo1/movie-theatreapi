// const express = require("express");
// const port = 3000;
const {app} = require("./src/app.js")
const {db} = require("./db/connection.js");
const port = 3000;

//TODO: Create your GET Request Route Below: 



app.listen(port, async () => {
//    await db.sync();
    console.log(`Listening at http://localhost:${port}/users`);
})





// module.exports = {port};