const express = require("express");
const router = express.Router();
const { getAll, getOne, store, destroy } = require("../../controllers/api/moviesController");

router
    .get("/movies", getAll)
    .get("/movies/:id", getOne)
    .post("/movies/create", store)
    .delete("/movies/delete/:id", destroy);

module.exports = router;