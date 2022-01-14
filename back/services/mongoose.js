const mongoose = require('mongoose');
require('dotenv').config();

const mongoString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.dgedp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const mongoConnect = () => {
    mongoose.connect(mongoString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => {
        console.log('Connexion à MongoDB échouée !');
        console.log(err);
    });
}

module.exports = {
    mongoConnect
}