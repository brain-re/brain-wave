const mongodb = require('../helpers/mongo-db');
const usersF = require("./users");
const rolesF = require("./roles");
const productsF = require("./products");


Promise.resolve()
    .then(mongodb.connect())
    .then(() => {
        console.log('Loading roles... 🏁');
        return rolesF().then((res) => {
            console.log('Roles done ✔️');
            return res;
        })
    })
    .then(() => {
        console.log('Loading users... 🏁');
        return usersF().then((res) => {
            console.log('Users done ✔️');
            return res;
        })
    })
    .then(() => {
        console.log('Loading products... 🏁');
        return productsF().then((res) => {
            console.log('Products done ✔️');
            return res;
        })
    })
    .catch((err) => console.log(`ERR ${err}`))
    .finally(() => mongodb.close());