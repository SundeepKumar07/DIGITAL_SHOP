import { config } from 'dotenv';

// Load env BEFORE any other module is imported
config({ path: './config/.env' });

// Now dynamically import app — this runs AFTER dotenv has loaded
const { default: app } = await import('./app.js');

//handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down server for handling uncaught exception");
});

//creating server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down the server for unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
});
