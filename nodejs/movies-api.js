const http = require("http");

const db = [
  {
    id: 1,
    title: "La naranja mecánica",
    genre: "drama",
    year: 1972,
    director: "Stanley Kubrick",
    minutes: 120,
  },
  {
    id: 2,
    title: "El Apartamento",
    genre: "comedy",
    year: 1964,
    director: "Billy Wilder",
    minutes: 90,
  },
  {
    id: 3,
    title: "Harry Potter I",
    genre: "fantasy",
    year: 2002,
    director: "Chris Columbus",
    minutes: 100,
  },
  {
    id: 4,
    title: "Sherk I",
    genre: "fantasy",
    year: 2002,
    director: "Fulanito",
    minutes: 110,
  },
];

async function processBody(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function handleRequest(req, res) {
  const url = req.url;
  const method = req.method;

  const [, endpoint, param] = url.split("/");
  const body = await processBody(req);

  if (method === "GET" && endpoint === "movies" && !param) {
    const year = parseInt(body["year"]);

    let result = [];

    if (year) {
      result = db.filter((movie) => movie.year === year);
    } else {
      result = db;
    }

    res.writeHead(200);
    res.end(JSON.stringify(result));
    return;
  }

  res.writeHead(404);
  res.end("Not found");
}

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log("Movies API is running on http://localhost:3000 🚀");
});
