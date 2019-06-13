const cheerio = require("cheerio");
const got = require("got");

/**
 * A lazy and inefficient way to decode HTML entities
 *
 * @param {string} str
 * @returns {string}
 */
const decodeHtml = (str) =>
  cheerio("<div/>")
    .html(str)
    .text();

const returnBody = (s) => s.body;

/**
 * Fetches a listing page
 * TODO: add a cookie header with sort params
 *
 * @param {*} resource
 * @param {*} page
 */
const fetchList = (r, o) => {
  const opts = { sort: "abc", order: "asc", page: 1, ...o };

  return got(
    `https://www.novelupdates.com/${r}/?st=1&sort=${opts.sort}&order=${
      opts.order
    }&pg=${opts.page}`
  ).then(returnBody);
};

const fetchNovel = (id) =>
  got(`https://www.novelupdates.com/?p=${id}`).then(returnBody);
const fetch = (path) =>
  got(`https://www.novelupdates.com/${path}`).then(returnBody);

/**
 * Parses the pagination element
 *
 * @param {CheerioStatic} $
 */
const pageInfo = ($) => {
  const last = $("div.digg_pagination")
    .children()
    .last();

  return {
    pageInfo: {
      current: Number($("em.current").text()),
      last: Number(
        last.hasClass("next_page") ? last.prev().text() : last.text()
      )
    }
  };
};

/**
 * Maps related/recommended seires
 *
 * @param {number} _ - index
 * @param {CheerioElement} el - cheerio element
 */
const parseSeries = (_, el) => {
  const s = cheerio(el)
    .text()
    .trim();

  if (!s) {
    return;
  }

  return {
    title: s,
    url: cheerio(el).attr("href")
  };
};

/**
 * Maps sidebar serie info
 *
 * @param {number} _ - index
 * @param {CheerioElement} el - cheerio element
 */
const parseSidebar = (_, el) => {
  el = cheerio(el);

  const s = el.text().trim();

  if (s && s !== "N/A") {
    return {
      name: el.text().trim(),
      url: el.attr("href")
    };
  }
};

module.exports = {
  decodeHtml,
  fetch,
  fetchList,
  fetchNovel,
  pageInfo,
  parseSeries,
  parseSidebar
};
