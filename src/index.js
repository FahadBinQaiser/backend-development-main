import dotenv from 'dotenv';
dotenv.config({
    path: "./.env"
});

import connectDB from './db/database.js';
import app from './app.js';

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Error displaying", error);
            throw error;
        });

        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed", err);
    });
