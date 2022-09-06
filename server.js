const express = require('express');
const { getMedia } = require('./utils');

const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 3001;

app.get("/get-trending-films", async (req, res) => {
    const trendingFilms = await getMedia({ movies: true })
    res.json({ "trendingFilms": trendingFilms })
})

app.get("/get-trending-tv-shows", async (req, res) => {
    const trendingTvShows = await getMedia({ tvShows: true })
    res.json({ "trendingTvShows": trendingTvShows })
})

server.listen(port);