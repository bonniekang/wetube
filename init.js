import "dotenv/config";
import app from "./app";
import "./db";
import "./models/Video.js"
import "./models/User.js"

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`)

app.listen(PORT, handleListening);