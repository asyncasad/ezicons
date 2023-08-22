/**
 * Fetch and log a request
 * @param {Request} request
 */
const icons = require("./dist/icons.json");

function handleIconsRequest(searchParams) {
  console.log(searchParams.get("dimension"));
  const dimension = searchParams.get("dimension") || 48;
  console.log(dimension, "KAKA");
  const gap = searchParams.get("gap") || 8;
  const perLine = searchParams.get("perLine") || 10;
  const iconNames = searchParams.get("icons").split(",");
  const iconSvgList = iconNames.map((i) => icons[i]);
  const SCALE = dimension / 256;
  const GAP_VB = (gap * 256) / dimension;
  const length =
    Math.min(perLine * (256 + GAP_VB), iconNames.length * (256 + GAP_VB)) -
    GAP_VB;
  const height =
    Math.ceil(iconSvgList.length / perLine) * (256 + GAP_VB) - GAP_VB;
  const scaledHeight = height * SCALE;
  const scaledWidth = length * SCALE;

  return `
    <svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      ${iconSvgList
        .map(
          (i, index) =>
            `
          <g transform="translate(${(index % perLine) * (256 + GAP_VB)}, ${
              Math.floor(index / perLine) * (256 + GAP_VB)
            })">
            ${i}
          </g>
          `
        )
        .join(" ")}
    </svg>
    `;
}

async function handleRequest(request) {
  const { searchParams, pathname } = new URL(request.url);
  if (pathname === "/icons/" && searchParams.get("icons")) {
    const result = handleIconsRequest(searchParams);
    return new Response(result, {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  }
  return Response.redirect("https://github.com/asyncasad/ezicons#readme");
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
