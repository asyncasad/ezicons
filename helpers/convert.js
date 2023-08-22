const fs = require("fs");
const tableHead = `| Icon ID | Icon |\n| ------- | ---- |\n`;
const categoryDirs = fs.readdirSync("./public/icons");
let tableRows = ``;
const icons = {};
for (const categoryDir of categoryDirs) {
  const themeDirs = fs.readdirSync(`./public/icons/${categoryDir}`);
  for (const themeDir of themeDirs) {
    const themedIconFiles = fs.readdirSync(
      `./public/icons/${categoryDir}/${themeDir}`
    );
    for (const icon of themedIconFiles) {
      const name = `${categoryDir}-${themeDir}-${icon
        .replace(".svg", "")
        .toLocaleLowerCase()}`;
      tableRows =
        tableRows +
        `| \`${name}\` | <img src="./public/icons/${categoryDir}/${themeDir}/${icon}" width="48"> |\n`;
      icons[name] = String(
        fs.readFileSync(`./public/icons/${categoryDir}/${themeDir}/${icon}`)
      );
    }
  }
}
const markdownTable = tableHead + tableRows;
fs.writeFile("./src/icon_table.md", markdownTable, (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("Markdown table generated successfully!");
  }
});
if (!fs.existsSync("./src/dist")) fs.mkdirSync("./src/dist");
fs.writeFileSync("./src/dist/icons.json", JSON.stringify(icons));
