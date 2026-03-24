const mongoose = require('mongoose');

async function checkDB() {
    try {
        // You might need to change the connection string if it's different
        await mongoose.connect('mongodb://localhost:27017/mutual-fund-explorer');
        const count = await mongoose.connection.collection('mutualfunds').countDocuments();
        console.log(`DB Count: ${count}`);
        process.exit(0);
    } catch (err) {
        console.error(`DB Error: ${err.message}`);
        process.exit(1);
    }
}

checkDB();
