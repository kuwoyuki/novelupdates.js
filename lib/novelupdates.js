const parsers = require("./parsers");
const { fetch, fetchNovel, fetchList } = require("./helpers");

module.exports = {
  /**
   * Gets an array of genre strings
   */
  genresList: () => fetch("genre-explanation").then(parsers.genresList),
  /**
   * Gets a list of all available tags and their descriptions
   *
   * @param {number} page Page number
   */
  tagsList: (page) => fetchList("list-tags", { page }).then(parsers.tagsList),
  /**
   * @param {number} id Novel ID
   */
  novel: (id) => fetchNovel(id).then(parsers.novel),
  /**
   * General novels list
   *
   * @param {Object} opts List request params
   * @param {number} opts.page Page number,
   * @param {string} opts.sort abc (default) | nrelease | trank | trate | tfreq | tread
   * @param {string} opts.order asc | desc
   */
  novelsList: (opts) =>
    fetchList("novelslisting", opts).then(parsers.novelsList),
  /**
   * Latest novels list
   *
   * @param {number} page Page number
   */
  latestNovelsList: (page) =>
    fetchList("latest-series", { page }).then(parsers.novelsList),
};
