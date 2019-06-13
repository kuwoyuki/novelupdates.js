const { promises: fs } = require("fs");
const { join } = require("path");
const { genresList } = require("../lib/parsers");

test("gets the genres list", async () => {
  const html = await fs.readFile(
    join(__dirname, "fixtures", "genresList.html")
  );
  const genres = await genresList(html);

  expect(genres).toHaveLength(35);
  expect(genres).toEqual(
    expect.arrayContaining([
      {
        genre: "Yuri",
        description:
          "This work usually involves intimate relationships between women."
      }
    ])
  );
});
