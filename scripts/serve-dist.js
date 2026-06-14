const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "dist");
const port = Number(process.env.PORT || process.argv[2] || 8081);
const host = process.env.HOST || "127.0.0.1";

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".ttf": "font/ttf"
};

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent((request.url || "/").split("?")[0]);
  const normalizedPath = path.normalize(urlPath).replace(/^[/\\]+/, "");
  const safePath = normalizedPath.replace(/^(\.\.[/\\])+/, "");
  const requested = path.join(root, safePath ? safePath : "index.html");
  const rootPrefix = `${path.resolve(root)}${path.sep}`.toLowerCase();
  const resolvedRequest = path.resolve(requested);
  const isInsideRoot = resolvedRequest.toLowerCase().startsWith(rootPrefix);
  const filePath = isInsideRoot && fs.existsSync(resolvedRequest) ? resolvedRequest : path.join(root, "index.html");

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(500);
      response.end("Unable to read file");
      return;
    }
    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream"
    });
    response.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`NaviPet preview running at http://${host}:${port}`);
});
