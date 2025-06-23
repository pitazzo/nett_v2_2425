const http = require("http");

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
  }

  let body = {};

  try {
    body = JSON.parse(raw);
  } catch {}

  if (url === "/toUpperCase" && method === "POST") {
    if (!body["value"]) {
      res.writeHead(400);
      res.end("Please provide a valid JSON with key <value>");
      return;
    }

    const response = { value: body["value"]?.toUpperCase() };

    res.writeHead(200);
    res.end(JSON.stringify(response));
    return;
  }

  if (url === "/add" && method === "POST") {
    const a = parseInt(body["a"]);
    const b = parseInt(body["b"]);

    if (!a || !b) {
      res.writeHead(400);
      res.end("Please provide valid numbers for a and b");
      return;
    }

    const response = {
      result: a + b,
    };

    res.writeHead(200);
    res.end(JSON.stringify(response));

    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(3000, () => {
  console.log("server is running at http://localhost:3000 🚀");
});
