const mongoose = require("mongoose");

const mongodb = {
    connect: () => 
        mongoose
        .connect("mongodb://admin_MEAN:5698741@mongo:27017/MEAN_FR", { useNewUrlParser: true , useUnifiedTopology: true})
        .then(
            (c) => console.log(`The connection has been opened for ${c.connection.name}`)
        ).catch(
            (err) => {
                console.log(`Can't open connection`);
                console.log(err);
            }
        )
    , close: () => 
        Promise
        .all(mongoose.connections.map((c) => c.close(true)))
        .then(() => console.log('All connections was closed'))
        .catch((err) => {
            console.log('Error while closing connection : ');
            console.log(err);
        })
    , drop: (collection) => mongoose.connection.dropCollection(collection).then(() => console.log(`${collection} deleted ✔️`))
}

module.exports = mongodb;