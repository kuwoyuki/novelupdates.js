const { promises: fs } = require("fs");
const { join } = require("path");
const { novel } = require("../lib/parsers");

test("parses a novel", async () => {
  const html = await fs.readFile(join(__dirname, "fixtures", "novel.html"));
  const n = novel(html);

  expect(n.id).toBe(364);
  expect(n.associatedNames).toEqual(expect.arrayContaining(["择天记"]));
});
