const express = require('express');
const { getMedia } = require('./utils');

const app = express();
const server = require("http").Server(app);

app.get("/get-trending-films", async (req, res) => {
    const trendingFilms = await getMedia({ movies: true })
    res.json({ "trendingFilms": trendingFilms })
})

app.get("/get-trending-tv-shows", async (req, res) => {
    const trendingTvShows = await getMedia({ tvShows: true })
    res.json({ "trendingTvShows": trendingTvShows })
})

server.listen(3000);