const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.cprliar.mongodb.net/social-network-project',
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        }
        )
    .then(() => console.log('Database MongoDB connected'))
    .catch(err => console.log('Failed to connect to MongoDB', err));
