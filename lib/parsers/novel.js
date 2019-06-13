const cheerio = require("cheerio");
const slugify = require("@sindresorhus/slugify");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

const {
  decodeHtml,
  pageInfo,
  parseSeries,
  parseSidebar
} = require("../helpers");

dayjs.extend(utc);

/**
 * Novel title
 *
 * @param {CheerioStatic} $
 */
const getTitle = ($) => {
  return $(".seriestitlenu")
    .text()
    .trim();
};

/**
 * Novel cover
 *
 * @param {CheerioStatic} $
 * @returns {string}
 */
const getCover = ($) => {
  return $(".seriesimg")
    .children()
    .first("img")
    .attr("src");
};

/**
 * Novel synopsis
 *
 * @param {CheerioStatic} $
 * @returns {string}
 */
const getSynopsis = ($) => {
  return $("#editdescription")
    .children()
    .text()
    .trim();
};

/**
 * Novel raw synopsis
 *
 * @param {CheerioStatic} $
 * @returns {string}
 */
const getRawSynopsis = ($) => $("#editdescription").html();

/**
 * Array of alternative titles
 *
 * @param {CheerioStatic} $
 * @returns {string[]}
 */
const getDifferName = ($) =>
  $("#editassociated")
    .html()
    .split("<br>")
    .map(decodeHtml);

/**
 * @param {CheerioStatic}
 */
const getTextNodes = ($) =>
  $(".wpb_wrapper")
    .eq(1)
    .contents()
    .filter((_, el) => el.type === "text" && /^\(.*\)$/.test(el.data.trim()))
    .map((_, el) =>
      $(el)
        .text()
        .trim()
        .replace(/[()]/g, "")
    )
    .toArray();

/**
 *
 * @param {CheerioStatic} $
 */
const getRelatedSerie = ($, types) => {
  const rs = $(".wpb_wrapper")
    .eq(1)
    .find("h5.seriesother")
    .eq(1)
    .nextUntil(".seriesother")
    .map(parseSeries)
    .get();

  return rs.map((s, i) => ({ ...s, type: types[i] }));
};

/**
 *
 * @param {CheerioStatic} $
 */
const getRecommendations = ($, types, rsLen) => {
  const rm = $(".wpb_wrapper")
    .eq(1)
    .find("h5.seriesother")
    .eq(2)
    .nextUntil("div")
    .map(parseSeries)
    .get();

  return rm.map((s, i) => ({ ...s, votes: Number(types[i + rsLen]) }));
};

const getType = ($) => {
  let el = $("#showtype")
    .children()
    .first();
  return {
    type: el.text().trim(),
    link: el.attr("href")
  };
};

const getGenres = ($) =>
  $("#seriesgenre")
    .children()
    .map(parseSidebar)
    .get();

const getTags = ($) =>
  $("#showtags")
    .children()
    .map(parseSidebar)
    .get();

/**
 *
 * @param {CheerioStatic} $
 */
const getRatings = ($) => {
  const getVote = (s) => {
    const {
      groups: { votes }
    } = /(?<votes>\d+)\svotes/g.exec(s);

    return Number(votes);
  };

  const vote = $(".votetext");

  return {
    1: getVote(vote.eq(4).text()),
    2: getVote(vote.eq(3).text()),
    3: getVote(vote.eq(2).text()),
    4: getVote(vote.eq(1).text()),
    5: getVote(vote.eq(0).text())
  };
};

const getLang = ($) =>
  $("#showlang")
    .children()
    .map(parseSidebar)
    .get();

const getAuthors = ($) =>
  $("#showauthors")
    .children()
    .map(parseSidebar)
    .get();

const getArtists = ($) =>
  $("#showartists")
    .children()
    .map(parseSidebar)
    .get();

const getYear = ($) => Number($("#edityear").text());

const getStatusCountryOrigin = ($) =>
  $("#editstatus")
    .text()
    .replace(/[\n\t\r]/g, "")
    .trim();

const getLicensed = ($) => /yes/i.test($("#showtranslated").text());

const getOriginPublisher = ($) =>
  $("#showopublisher")
    .children()
    .map(parseSidebar)
    .get();

const getEnglishPublisher = ($) =>
  $("#showepublisher")
    .children()
    .map(parseSidebar)
    .get();

const getRelease = ($) =>
  $("#myTable > tbody > tr")
    .map((_, el) => {
      el = $(el);
      const a = el.find("a");

      if (!a.first().text()) {
        return;
      }

      return {
        date: dayjs
          .utc(
            el
              .children()
              .first()
              .text()
          )
          .toDate(),
        title: a
          .last()
          .text()
          .trim(),
        group: a
          .first()
          .text()
          .trim(),
        url: a.last().attr("href")
      };
    })
    .get();

/**
 * @param {CheerioStatic} $
 */
const getID = ($) => Number($("#mypostid").attr("value"));

const parsePage = ($) => {
  const types = getTextNodes($);
  const related = getRelatedSerie($, types);
  const recommendations = getRecommendations($, types, related.length);
  const title = getTitle($);

  return {
    id: getID($),
    slug: slugify(title),
    title,
    cover: getCover($),
    synopsis: getSynopsis($),
    rawSynopsis: getRawSynopsis($),
    associatedNames: getDifferName($),
    related,
    recommendations,
    type: getType($),
    genres: getGenres($),
    tags: getTags($),
    ratings: getRatings($),
    languages: getLang($),
    authors: getAuthors($),
    artists: getArtists($),
    year: getYear($),
    statusCOO: getStatusCountryOrigin($),
    licensed: getLicensed($),
    originPublisher: getOriginPublisher($),
    englishPublisher: getEnglishPublisher($),
    releases: {
      ...pageInfo($),
      data: getRelease($)
    }
  };
};

const parseNovel = (html) => parsePage(cheerio.load(html));

module.exports = parseNovel;
