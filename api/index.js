import express from "express";

const app = express();
const PORT = 4173;

app.route('/api/test')
    .get((req, res) => {
        res.send("Get request test response");
    }).post((req, res) => {
        res.send("Post request test response");
    }).put((req, res) => {
        res.send("Put request test response");
    }).patch((req, res) => {
        res.send("Patch request test response");
    }).delete((req, res) => {
        res.send("Delete request test response");
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});