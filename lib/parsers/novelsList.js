const cheerio = require("cheerio");
const { nodeText, pageInfo } = require("../helpers");

/**
 * @param {number} i - index
 * @param {CheerioElement} el - cheerio .bdrank element
 */
const parseRow = (_, el) => {
  const row = cheerio(el);
  const searchBody = row.find(".search_body_nu");
  const idSpan = row
    .find(".search_title")
    .children()
    .first();
  const a = searchBody.find(".search_title > a");
  const url = a.attr("href");
  const slug = url.split("/")[4];
  const genres = row
    .find(".gennew")
    .map((_, g) => cheerio(g).text())
    .toArray();
  const description = (
    nodeText(searchBody) + nodeText(searchBody.find(".testhide"))
  ).trim();

  return {
    id: Number(idSpan.attr("id").replace("sid", "")),
    slug,
    url,
    title: a.text(),
    description,
    thumbnail: row.find("img").attr("src"),
    averageRating: Number(
      nodeText(row.find(".search_ratings")).replace(/[()]/g, "")
    ),
    type: row.find(".search_ratings > span").text(),
    genres
  };
};

/**
 * @param {CheerioStatic} $
 */
const parsePage = ($) => ({
  ...pageInfo($),
  data: $(".search_main_box_nu")
    .map(parseRow)
    .toArray()
});

/**
 * @param {string} html
 */
const novelsList = (html) => parsePage(cheerio.load(html));

module.exports = novelsList;
