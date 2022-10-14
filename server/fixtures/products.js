const { faker } = require('@faker-js/faker');
const usersModel = require("../models/users.model");
const productsModel = require("../models/products.model");

module.exports = () => 
    usersModel.find()
        .then((users) => {
            let products = [];
            for(var i = 0; i < 100; i++) {
                products.push(new productsModel({
                    name: faker.helpers.unique(() => faker.commerce.productName()),
                    description: faker.commerce.productDescription(),
                    price: faker.commerce.price(),
                    categories: [],
                    images: faker.helpers.uniqueArray([faker.image.abstract(), faker.image.abstract()], 2),
                    createdAt: faker.date.recent(),
                    creator: faker.helpers.arrayElement(users),
                    liked: faker.helpers.uniqueArray(users, faker.random.numeric(1)),
                    disliked: faker.helpers.uniqueArray(users, faker.random.numeric(1))
                }));
            }

            return products;
        })
        .then((products) => productsModel.bulkSave(products))
        .catch((res) => {
            if (res.code == 11000) {
                console.log("🚩 Products insertion was stopped as database contains dupplicate keys");
            } else {
                throw err;
            }
        });