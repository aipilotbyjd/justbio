// use express js server with next js server to serve static files

const express = require("express");
const next = require("next");
const { parse } = require("url");
const { join } = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/service-worker.js", (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const filePath = join(__dirname, ".next", pathname);

    app.serveStatic(req, res, filePath);
  });

  server.get("*", (req, res) => handle(req, res));

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
