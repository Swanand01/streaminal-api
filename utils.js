const fetch = require('node-fetch');
const cheerio = require("cheerio");

function getMediaItemDetails(item, $) {
    const itemATag = $($(item).find('.film-detail')).find('.film-name').find('a');
    const itemName = itemATag.text();
    const itemLink = itemATag.attr("href").slice(1);
    const itemImage = $($(item).find(".film-poster")).find('img').attr('data-src');
    const itemReleaseDate = $($(item).find('.film-detail')).find('.fd-infor').find('.fdi-item').text().slice(0, 4);
    const itemDuration = $($(item).find('.film-detail')).find('.fd-infor').find('.fdi-duration').text();

    return {
        id: itemLink,
        title: itemName,
        image: itemImage,
        releaseDate: itemReleaseDate,
        duration: itemDuration
    }
}

async function getTrendingMedia({ movies, tvShows }) {
    const response = await fetch('https://flixhd.cc/');
    const data = await response.text();
    const $ = cheerio.load(data);

    let media = [];
    let mediaScrapeArr = [];

    if (movies) {
        mediaScrapeArr = $("#trending-movies").find(".film_list-wrap");
    }
    else if (tvShows) {
        mediaScrapeArr = $("#trending-tv").find(".film_list-wrap");
    }

    mediaScrapeArr.find('.flw-item').each((i, el) => {
        const mediaItem = $(el);
        media.push(getMediaItemDetails(mediaItem, $));
    });

    return media;
}

async function getLatestMedia({ movies, tvShows }) {
    const response = await fetch('https://flixhd.cc/');
    const data = await response.text();
    const $ = cheerio.load(data);

    let latestDiv;
    let media = [];

    if (movies) {
        latestDiv = $("h2:contains('Latest Movies')");
    }
    else if (tvShows) {
        latestDiv = $("h2:contains('Latest TV Shows')");
    }

    const mediaListDiv = $(latestDiv.parent().parent().siblings()[0]).find('.film_list-wrap');

    mediaListDiv.find('.flw-item').each((i, el) => {
        const mediaItem = $(el);
        media.push(getMediaItemDetails(mediaItem, $));
    });

    return media;
}

module.exports = {
    getTrendingMedia: getTrendingMedia,
    getLatestMedia: getLatestMedia
}