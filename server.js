const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();
// Connect to the database
const mongoURI = `mongodb+srv://sandesh:${process.env.DBPASSWORD}@mongo-aws.bav9k.mongodb.net/myDb?retryWrites=true&w=majority`;
mongoose
    .connect(mongoURI,{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => {console.log('Connected to MongoDB')})
    .catch( err => console.log(err))

// Start the server and listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Listening on port',PORT));