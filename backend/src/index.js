import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import auth from "./routes/auth.routes.js";
import users from "./routes/user.routes.js";
import textToAudio from "./routes/textToAudio.routes.js";


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use("/api", auth);
app.use("/api", users);
app.use("/api", textToAudio);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
