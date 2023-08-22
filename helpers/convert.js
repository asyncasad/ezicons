// const fs = require("fs");

// const iconsDir = fs.readdirSync("./public/icons");
// const icons = {};
// for (const icon of iconsDir) {
//   const name = icon.replace(".svg", "").toLowerCase();
//   icons[name] = String(fs.readFileSync(`./public/icons/${icon}`));
// }

// if (!fs.existsSync("./src/dist")) fs.mkdirSync("./src/dist");
// fs.writeFileSync("./src/dist/icons.json", JSON.stringify(icons));

const fs = require("fs");

const categoryDirs = fs.readdirSync("./public/icons");
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
      icons[name] = String(
        fs.readFileSync(`./public/icons/${categoryDir}/${themeDir}/${icon}`)
      );
    }
  }
}
if (!fs.existsSync("./src/dist")) fs.mkdirSync("./src/dist");
fs.writeFileSync("./src/dist/icons.json", JSON.stringify(icons));
