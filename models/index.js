const Show = require('./Show')
const User = require('./User')

Show.belongsToMany(User, {through: "user-show"})
User.belongsToMany(Show, {through: "user-show"})


module.exports = {
    Show, 
    User
}
