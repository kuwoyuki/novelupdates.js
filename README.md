# novelupdates.js [![Build Status](https://travis-ci.org/kuwoyuki/novelupdates.js.svg?branch=master)](https://travis-ci.org/kuwoyuki/novelupdates.js)

parses novelupdates 🤷

## Installing

install from npmjs

```sh
yarn add novelupdates.js
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
   * @param {object} opts
   * @param {number} opts.pg Page number
   * @param {number} opts.st 1
   */
  tagsList: opts => fetchList("list-tags", opts).then(parsers.tagsList),
  /**
   * @param {number} id Novel ID
   */
  novel: id => fetchNovel(id).then(parsers.novel),
  /**
   * General novels list
   *
   * @param {object} opts List request params
   * @param {number} opts.pg Page number
   * @param {number} opts.sort frequency = 1, rank = 2, rating = 3, readers = 4, chapters = 5, reviews = 6, title = 7, last updated = 8
   * @param {number} opts.order asc = 1, desc = 2
   * @param {number} opts.status all = 1, completed = 2, ongoing = 3, hiatus = 4
   */
  novelsList: opts => fetchList("novelslisting", opts).then(parsers.novelsList),
  /**
   * Latest novels list
   *
   * @param {number} page Page number
   */
  latestNovelsList: page =>
    fetchList("latest-series", { page }).then(parsers.novelsList),
};
```
