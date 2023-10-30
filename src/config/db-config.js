const mongoose = require('mongoose');
const {UR_INDENTIFIER} = require('./server-config')


async function DBconnect(){
    console.log('Connecting to Mongo DB , Please wait .....');
    const result = await mongoose.connect(UR_INDENTIFIER)
    console.log('Mongo DB connected');
}

module.exports = {
    DBconnect
}