import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import auth from "./routes/auth.routes.js";
import users from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api", auth);
app.use("/api", users);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
