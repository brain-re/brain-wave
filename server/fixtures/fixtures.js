const mongodb = require('../helpers/mongo-db');
const usersF = require("./users");
const rolesF = require("./roles");
const articleF = require("./article");
const categoriesF = require("./categories");
const Input = require('./io');

let input = new Input();

mongodb.connect()
    .then(async () => {
        if (input.option('prune')) {
            console.groupCollapsed('Pruning database... 🏁');
            await Promise.all([
                mongodb.drop('articles'),
                mongodb.drop('categories'),
                mongodb.drop('users')
            ]).then(() => {
                console.log('Database pruning has ended ✔️');
                console.groupEnd();
            });
        }
    })
    .then(async () => {
        await Promise.resolve().then(() => console.log('Loading roles... 🏁')).then(() => rolesF()).then(() => console.log('Roles done ✔️'));
        await Promise.resolve().then(() => console.log('Loading users... 🏁')).then(() => usersF()).then(() => console.log('Users done ✔️'));
        await Promise.resolve().then(() => console.log('Loading categories... 🏁')).then(() => categoriesF()).then(() => console.log('Categories done ✔️'));
        await Promise.resolve().then(() => console.log('Loading articles... 🏁')).then(() => articleF()).then(() => console.log('Articles done ✔️'));
    })
    .then(() => mongodb.close())
    .catch((err) => console.log(`ERR ${err}`))