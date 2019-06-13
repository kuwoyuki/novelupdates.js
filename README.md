# novelupdates.js [![Build Status](https://travis-ci.org/kuwoyuki/novelupdates.js.svg?branch=master)](https://travis-ci.org/kuwoyuki/novelupdates.js)

parses novelupdates 🤷

## Installing

idk just use github for now

```sh
yarn add kuwoyuki/novelupdates.js#master
```

## Usage

return format for `*List` methods is:

```js
{
  pageInfo: { current: 1, last: 202 },
  data: [...]
}
```

available methods atm.:

```js
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
  tagsList: (page) => fetchList("list-tags", page).then(parsers.tagsList),
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
    fetchList("latest-series", page).then(parsers.novelsList)
};
```
