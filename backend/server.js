import app from './app.js';
import dotenv from "dotenv";

//handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server for handling uncaught exception");
});

//config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({
        path: './config/.env'
    });
}

//creating server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", () => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down the server for unhandle promise rejection`);

    server.close(()=> {
        process.exit(1);
    })
})