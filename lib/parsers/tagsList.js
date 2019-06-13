const cheerio = require("cheerio");
const { pageInfo } = require("../helpers");

/**
 * @param {CheerioElement} el - cheerio .bdrank element
 */
const parseTags = (_, el) => ({
  tag: cheerio(el)
    .text()
    .trim(),
  description:
    cheerio(el).attr("title") === "No definition found."
      ? null
      : cheerio(el)
          .attr("title")
          .trim()
});

const parsePage = ($) => ({
  ...pageInfo($),
  data: $(".staglistall")
    .find("a")
    .map(parseTags)
    .toArray()
});

/**
 * @param {string} html
 */
const tagsList = (html) => parsePage(cheerio.load(html));

module.exports = tagsList;
