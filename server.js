const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

loadEnvFile(path.join(__dirname, ".env"));

const interpretHandler = require("./api/interpret");

const PORT = Number(process.env.PORT || 3000);
const BUILD_DIR = path.join(__dirname, "build");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const env = fs.readFileSync(filePath, "utf8");

  env.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const equalsIndex = trimmed.indexOf("=");

    if (equalsIndex === -1) {
      return;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    const value = trimmed.slice(equalsIndex + 1).trim();

    if (key && process.env[key] === undefined) {
      process.env[key] = value.replace(/^["']|["']$/g, "");
    }
  });
}

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(body));
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendJson(res, 404, { error: "Not found" });
      return;
    }

    res.writeHead(200, {
      "Content-Type": getContentType(filePath),
    });
    res.end(content);
  });
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  const types = {
    ".css": "text/css",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".js": "text/javascript",
    ".json": "application/json",
    ".map": "application/json",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".txt": "text/plain",
  };

  return types[extension] || "application/octet-stream";
}

function createApiResponse(res) {
  return {
    status(statusCode) {
      res.statusCode = statusCode;
      return this;
    },
    json(body) {
      sendJson(res, res.statusCode || 200, body);
    },
  };
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let rawBody = "";

    req.on("data", (chunk) => {
      rawBody += chunk;
    });

    req.on("end", () => {
      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

async function handleApiRequest(req, res) {
  try {
    req.body = await readJsonBody(req);
    await interpretHandler(req, createApiResponse(res));
  } catch (error) {
    sendJson(res, 400, { error: "Invalid JSON body" });
  }
}

function handleStaticRequest(req, res) {
  if (!fs.existsSync(BUILD_DIR)) {
    sendJson(res, 500, {
      error: "Build folder not found. Run npm run build first.",
    });
    return;
  }

  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const safePath = path
    .normalize(decodeURIComponent(requestUrl.pathname))
    .replace(/^(\.\.[/\\])+/, "");
  const requestedPath = path.join(BUILD_DIR, safePath);

  if (requestedPath.startsWith(BUILD_DIR) && fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()) {
    sendFile(res, requestedPath);
    return;
  }

  sendFile(res, path.join(BUILD_DIR, "index.html"));
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/interpret")) {
    handleApiRequest(req, res);
    return;
  }

  handleStaticRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`App and API running together at http://localhost:${PORT}`);
});
