const express = require(`express`);
const router = require(`./routes`);
const connection = require(`./config/db`);
require(`dotenv`).config();

const app = express();
const port = 1234;

app.use(express.json());

app.use(`/api`, router);

app.get(`/api/reset`, (req, res) => {
    connection.sync({
        force: true,
    }).then(() => {
        res.status(201).send("Database reset!");
    }).catch((error) => {
        res.status(500).send("Database reset failed!");
        console.log(error);
    })
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})