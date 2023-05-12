const express = require("express")
const app = express();
const {usersRouter} = require("../routes/usersRouter.js")
const {showsRouter} = require("../routes/showsRouter.js")


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/users", usersRouter);
app.use("/shows", showsRouter);




module.exports = {app};
