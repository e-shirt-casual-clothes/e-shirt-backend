const express = require ('express');
const router = require ('./routes');
const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 3322, () => {
    console.log("Server started!");
})