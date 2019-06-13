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
        id: 7206,
        slug: "everyone-else-is-a-returnee",
        url: "https://www.novelupdates.com/series/everyone-else-is-a-returnee/",
        title: "Everyone Else is a Returnee",
        description:
          "Left out during the elementary school picnic.\nLeft out during " +
          "the middle school camp.\nLeft out during the high school trip.\nI " +
          "finally became a college student, and what? I’m left out from " +
          "all of humanity?\nIgnored by God, Yu IlHan spends a millennium " +
          "sharpening his skills for the Great Cataclysm, watching over " +
          "Earth alone while everybody else is away in other worlds.\nHis " +
          "legend starts after humanity comes back and meets the Great " +
          "Cataclysm!",
        thumbnail: "https://cdn.novelupdates.com/img/series_7206.jpg",
        averageRating: 4.4,
        type: "KR",
        genres: [
          "Completed",
          "Action",
          "Adventure",
          "Comedy",
          "Fantasy",
          "Harem",
          "Martial Arts",
          "Mystery",
          "Romance",
          "Supernatural"
        ]
      }
    ])
  );
});
