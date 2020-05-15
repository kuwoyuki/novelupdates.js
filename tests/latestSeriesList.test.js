const { promises: fs } = require("fs");
const { join } = require("path");
const { novelsList } = require("../lib/parsers");

test("parses the *latest* novel list", async () => {
  const html = await fs.readFile(
    join(__dirname, "fixtures", "latestSeriesList.html")
  );
  const novels = await novelsList(html);

  expect(novels.pageInfo.last).toEqual(100); // latest always has 100 pages
  expect(novels.data).toHaveLength(25);
  expect(novels.data).toEqual(
    expect.arrayContaining([
      {
        id: 30366,
        slug: "fugou-keiji",
        url: "https://www.novelupdates.com/series/fugou-keiji/",
        title: "Fugou Keiji",
        description: `Daisuke Kanbe, a gifted detective with an extraordinary amount of money at his disposal. One day, the Metropolitan Police assigns him to a new department where he is paired with fellow detective Haru Katou, who couldn’t be more opposite from him.\nHaru believes that there is more to life than just money, which is a stark contrast to Daisuke’s materialistic ways. However, they must find a way to come to terms with each other in order to solve the various mysteries that face them.`,
        thumbnail: "https://cdn.novelupdates.com/imgmid/series_30366.jpg",
        averageRating: 3.5,
        type: "JP",
        genres: ["Action", "Mystery"],
      },
    ])
  );
});
