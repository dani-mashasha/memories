import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import postRoutes from "./routs/posts.js";
import userRoutes from "./routs/users.js";

const __dirname = path.resolve();

const app = express();
dotenv.config();

app.use(express.static(__dirname + "/client/build"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.send("Hello to memories API");
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));
