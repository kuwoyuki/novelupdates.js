const { promises: fs } = require("fs");
const { join } = require("path");
const { tagsList } = require("../lib/parsers");

test("parses the tag list", async () => {
  const html = await fs.readFile(join(__dirname, "fixtures", "tagsList.html"));
  const tags = await tagsList(html);

  expect(tags.data).toHaveLength(50);
  expect(tags.data).toEqual(
    expect.arrayContaining([
      {
        tag: "Calm Protagonist",
        description:
          "This tag is used when the protagonist is able to remain calm in difficult and dangerous situation."
      }
    ])
  );
  expect(tags.pageInfo.current).toBe(3);
  expect(tags.pageInfo.last).toBe(16);
});
