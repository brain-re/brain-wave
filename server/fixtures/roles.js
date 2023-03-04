const rolesModel = require("../models/roles.model");

module.exports = () =>
    Promise.resolve().then(
        () => [
            new rolesModel({
                _id: "62463c087ad782107e12ff7a",
                rights: "all",
                role_name: "administrator"
            }),
            new rolesModel({
                _id: "6288df5bfb6f79012342f80a",
                rights: "basic",
                role_name: "user"
            }),
            new rolesModel({
                _id: "6288dfd888de3002084436fb",
                rights: "elevated",
                role_name: "creator"
            }),
        ]
    )
    .then((roles) => rolesModel.bulkSave(roles))
    .catch((err) => {
        if (err.code == 11000) {
            console.log("🚩 Roles insertion was stopped as database contains dupplicate keys");
        } else {
            throw err;
        }
    });