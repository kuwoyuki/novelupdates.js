const cheerio = require("cheerio");

/**
 * @param {CheerioStatic} $ - cheerio .bdrank element
 */
const parseGenres = ($) =>
  $(".w-blog-content > table:nth-child(1) > tbody:nth-child(1) > tr")
    .map((_, row) => {
      const [genre, description] = $(row)
        .children()
        .toArray();

      if (genre.tagName !== "td") {
        return;
      }

      return {
        genre: $(genre).text(),
        description: $(description)
          .text()
          .trim()
      };
    })
    .toArray();

const genresList = (html) => parseGenres(cheerio.load(html));

module.exports = genresList;
