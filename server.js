const express = require('express');
const { getTrendingMedia, getLatestMedia } = require('./utils');
const cors = require('cors')

const app = express();
app.use(cors())

const server = require("http").Server(app);
const port = process.env.PORT || 3000;

let cache = {}

const REQ_RES = {
    "get-trending-movies": "trendingMovies",
    "get-trending-tv-shows": "trendingTvShows",
    "get-latest-movies": "latestMovies",
    "get-latest-tv-shows": "latestTvShows"
}

function caching(req, res, next) {
    let url = req.url;
    url = url.slice(1);

    if (cache[url] && Object.keys(cache[url]).length > 0) {
        console.log("USING CACHE", url);
        let diff = Date.now() - cache[url].timestamp;
        if (diff / 3600000 < 1) {
            res.json({ [REQ_RES[url]]: cache[url].data });
            return
        }
    }

    next();
}

app.use(caching);

app.get("/get-trending-movies", async (req, res) => {
    const trendingMovies = await getTrendingMedia({ movies: true });
    res.json({ "trendingMovies": trendingMovies });

    console.log("SCRAPING TRENDING MOVIES");

    cache["get-trending-movies"] = {
        timestamp: Date.now(),
        data: trendingMovies
    };
})

app.get("/get-trending-tv-shows", async (req, res) => {
    const trendingTvShows = await getTrendingMedia({ tvShows: true });
    res.json({ "trendingTvShows": trendingTvShows });

    console.log("SCRAPING TRENDING SHOWS");

    cache["get-trending-tv-shows"] = {
        timestamp: Date.now(),
        data: trendingTvShows
    };
})

app.get("/get-latest-movies", async (req, res) => {
    const latestMovies = await getLatestMedia({ movies: true });
    res.json({ "latestMovies": latestMovies });

    console.log("SCRAPING LATEST MOVIES");

    cache["get-latest-movies"] = {
        timestamp: Date.now(),
        data: latestMovies
    };
})

app.get("/get-latest-tv-shows", async (req, res) => {
    const latestTvShows = await getLatestMedia({ tvShows: true });
    res.json({ "latestTvShows": latestTvShows });

    console.log("SCRAPING LATEST TV SHOWS");

    cache["get-latest-tv-shows"] = {
        timestamp: Date.now(),
        data: latestTvShows
    };
})

server.listen(port);