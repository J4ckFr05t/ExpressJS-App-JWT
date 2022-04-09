const mongoose = require('mongoose')

const url = 'mongodb+srv://jackfrost:Oyp3vN0217tNTY9d@cluster0.omqxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async ()=>{
    await mongoose.connect(url, {
        useUnifiedTopology : true,
        useNewUrlParser : true
    });
    console.log('Database Connected :)')
}

module.exports = connectDB;