/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
  if (request.method !== "GET") {
    return Response.redirect("https://github.com/asyncasad");
  }
  const { searchParams } = new URL(request.url);
  return new Response("Hello worker!", { status: 200 });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
