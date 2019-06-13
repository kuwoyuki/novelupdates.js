const { promises: fs } = require("fs");
const { join } = require("path");
const { novelsList } = require("../lib/parsers");

test("parses the novel list", async () => {
  const html = await fs.readFile(
    join(__dirname, "fixtures", "novelsList.html")
  );
  const novels = await novelsList(html);

  expect(novels.data).toHaveLength(25);
  expect(novels.data).toEqual(
    expect.arrayContaining([
      {
        id: 21596,
        slug: "rebirth-of-a-movie-star",
        url: "https://www.novelupdates.com/series/rebirth-of-a-movie-star/",
        title: "Rebirth of a Movie Star",
        description:
          "In his previous life Bai Lang was a small star. He rejected his boss " +
          "and stupidly engaged in a relationship which he thought was true " +
          "love.\nHe didn’t expect that he would get betrayed, die of a heart " +
          "attack and trouble his boss to accompany him on his last journey.\n" +
          "After his rebirth, he decided to give up on true love. As for his " +
          "boss… since he wants something then just let him have it ba.\nSo this " +
          "little star after his rebirth collected his boss, and then it became " +
          "a true love story with his boss.\nIn between there are good " +
          "friends/love rivals/scum men in the mix. A sweet story with a happy " +
          "ending.",
        thumbnail: "https://cdn.novelupdates.com/img/series_21596.jpg",
        averageRating: 4.8,
        type: "CN",
        genres: ["Drama", "Mature", "Romance", "Slice of Life", "Yaoi"]
      }
    ])
  );
});
