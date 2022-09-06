const fetch = require('node-fetch');
const cheerio = require("cheerio");

async function getMedia({ movies, tvShows }) {
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
        const filmItem = $(el);
        const filmATag = $($(filmItem).find('.film-detail')).find('.film-name').find('a');
        const filmName = filmATag.text();
        const filmLink = filmATag.attr("href").slice(1);
        const filmImage = $($(filmItem).find(".film-poster")).find('img').attr('data-src');
        const filmReleaseDate = $($(filmItem).find('.film-detail')).find('.fd-infor').find('.fdi-item').text().slice(0, 4);
        const filmDuration = $($(filmItem).find('.film-detail')).find('.fd-infor').find('.fdi-duration').text();

        media.push({
            id: filmLink,
            title: filmName,
            image: filmImage,
            releaseDate: filmReleaseDate,
            duration: filmDuration
        });
    });

    return media;
}

module.exports = {
    getMedia: getMedia
}