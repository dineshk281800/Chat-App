// npm package
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

const app = express();

const database = require('./config/dbConnect.js')

// handle uncaught Exception
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({ path: 'backend/config/config.env' })
}

// connection to database
database.db();

app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser())

const authRoutes = require('./routes/authRoute')
const messageRoutes = require('./routes/messageRoute')

// middlewares
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/messages', messageRoutes)

if (process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
    })
}

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT} IN ${process.env.NODE_ENV} mode.`)
});


// handle unhandled Rejection
// on() is a event loop handler

process.on("unhandlerRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});