const cheerio = require("cheerio");
const { pageInfo } = require("../helpers");

/**
 * @param {number} i - index
 * @param {CheerioElement} el - cheerio .bdrank element
 */
const parseRow = (_, el) => {
  const row = cheerio(el);
  const a = row.find("a").eq(1);
  const url = a.attr("href");
  const slug = url.split("/")[4];
  const genres = row
    .find(".gennew")
    .map((_, g) => cheerio(g).text())
    .toArray();
  const description = row
    .find(".noveldesc")
    .text()
    .replace(/\.\.\.\smore>>|<<less/gm, "")
    .trim();

  return {
    id: Number(a.attr("id").replace("sid", "")),
    slug,
    url,
    title: a.text(),
    description,
    thumbnail: row.find("img").attr("src"),
    averageRating: Number(
      row
        .find(".lstrate")
        .text()
        .replace(/[()]/g, "")
    ),
    type: row.find(".orgalign > span").text(),
    genres
  };
};

/**
 * @param {CheerioStatic} $
 */
const parsePage = ($) => ({
  ...pageInfo($),
  data: $(".bdrank")
    .map(parseRow)
    .toArray()
});

/**
 * @param {string} html
 */
const novelsList = (html) => parsePage(cheerio.load(html));

module.exports = novelsList;
