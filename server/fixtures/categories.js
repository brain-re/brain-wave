const { faker } = require('@faker-js/faker');
const categoriesModel = require("../models/categories.model");

module.exports = () => 
    Promise.resolve().then(
        () => {
            let categories = [];
            for(var i = 0; i < 10; i++) {
                categories.push(new categoriesModel({
                    name: faker.helpers.unique(() => faker.commerce.department()),
                    description: 'Categories description',
                }));
            }

            return categories;
        }
    )
    .then((categories) => categoriesModel.bulkSave(categories))
    .catch((err) => {
        if (err.code == 11000) {
            console.log("🚩 Categories insertion was stopped as database contains dupplicate keys");
        } else {
            throw err;
        }
    });