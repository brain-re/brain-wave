const mongodb = require('../helpers/mongo-db');
const usersF = require("./users");
const rolesF = require("./roles");
const productsF = require("./products");
const categoriesF = require("./categories");


mongodb.connect()
    .then(() => {console.log('Loading roles... 🏁')})
    .then(() => rolesF())
    .then((res) => {
        console.log('Roles done ✔️');
        return res;
    })
    .then(() => {console.log('Loading users... 🏁')})
    .then(() => usersF())
    .then((res) => {
        console.log('Users done ✔️');
        return res;
    })
    .then(() => {console.log('Loading categories... 🏁')})
    .then(() => categoriesF())
    .then((res) => {
        console.log('Categories done ✔️');
        return res;
    })
    .then(() => {console.log('Loading products... 🏁')})
    .then(() => productsF())
    .then((res) => {
        console.log('Products done ✔️');
        return res;
    })
    .then(() => mongodb.close())
    .catch((err) => console.log(`ERR ${err}`))