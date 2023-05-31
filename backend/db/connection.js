const mongoose = require('mongoose');
const url = "mongodb+srv://mdfaizanalam:notes4you@cluster0.yt9tlsw.mongodb.net/notes4you?retryWrites=true&w=majority";
try {
    mongoose.connect(url, () => {
        console.log("Connection to mongo is successful");
    })
} catch (error) {
    console.log(error);
    console.log("Could not connect to mongo");
}