const express = require('express');
const { getTrendingMedia, getLatestMedia } = require('./utils');

const app = express();
const server = require("http").Server(app);
const port = process.env.PORT || 3000;

app.get("/get-trending-films", async (req, res) => {
    const trendingFilms = await getTrendingMedia({ movies: true });
    res.json({ "trendingFilms": trendingFilms });
})

app.get("/get-trending-tv-shows", async (req, res) => {
    const trendingTvShows = await getTrendingMedia({ tvShows: true });
    res.json({ "trendingTvShows": trendingTvShows });
})

app.get("/get-latest-movies", async (req, res) => {
    const latestMovies = await getLatestMedia({ movies: true });
    res.json({ "latestMovies": latestMovies });
})

app.get("/get-latest-tv-shows", async (req, res) => {
    const latestTvShows = await getLatestMedia({ tvShows: true });
    res.json({ "latestTvShows": latestTvShows });
})

server.listen(port);