const { faker } = require('@faker-js/faker');
const rolesModel = require("../models/roles.model")
const usersModel = require("../models/users.model")

module.exports = () =>
    rolesModel.find()
    .then((roles) => {
        let users = [];

        for(var i = 0; i < 100; i++) {
            let _hr_roles = faker.helpers.arrayElements(roles);
            const sex = faker.name.sex();
            const firstname = faker.name.firstName(sex);
            const lastname = faker.name.lastName(sex);
            users.push(new usersModel({
                firstname,
                lastname,
                email: faker.helpers.unique(() => faker.internet.email(firstname, lastname)),
                password: 'test@1234',
                roles: _hr_roles,
                blocked: faker.random.numeric(2) > 75
            }));
        }

        return users;
    })
    .then((users) => usersModel.bulkSave(users))
    .catch((res) => {
        if (res.code == 11000) {
            console.log("🚩 Users insertion was stopped as database contains dupplicate keys");
        } else {
            throw err;
        }
    });