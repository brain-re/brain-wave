const router = require("express").Router();
const proposition_entreprises = require("../../../models/proposition_entreprises_models");
var funct_check_information = require('../../utility function/check_input').check_information;


router.post("/", (req, res) => {
    at_checked_array = [req.body.name, req.body.description]
    if (funct_check_information(at_checked_array) == false){
        res.status(401).send("Need description and name")
        res.end()
    }
    else {
        const entreprises = new proposition_entreprises ({
            validate_by_admin: 'false',
            name: req.body['name'].trim(),
            description: req.body['description'].trim(),
            url: req.body['url'].trim(),
            adresse: req.body['adresse'].trim(),
            proprietaire: req.body['proprietaire'].trim(),
            numeros: req.body['numeros'].trim(),
            commentaire: req.body['commentaire'].trim(),
            });
            entreprises.save(function(err){
              if (err) {
                res.status(400).send('[!] all information are not send correctly to the server for the creation of a product, or the product already exist')
                res.end()
              }
              else{
                res.json("[+] Products created")
                res.end()
              }
            })
    }
})

module.exports = router;