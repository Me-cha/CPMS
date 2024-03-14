const mongoose = require('mongoose');


const connect = (uri) => {
    return mongoose.connect(uri);
}

module.exports = connect;