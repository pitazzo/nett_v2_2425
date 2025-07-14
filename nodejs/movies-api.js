const http = require("http");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const VALID_GENRES = ["comedy", "drama", "terror", "fantasy"];
const UUID_REGEX = new RegExp(
  "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
);

let db = [
  {
    id: "aa9d2986-fbbd-4d31-8d5c-1ec8ae11f368",
    title: "La naranja mecánica",
    genre: "drama",
    year: 1972,
    director: "Stanley Kubrick",
    minutes: 120,
  },
  {
    id: "71f7913e-98c9-4a63-b986-cf1fc3730e3a",
    title: "El Apartamento",
    genre: "comedy",
    year: 1964,
    director: "Billy Wilder",
    minutes: 90,
  },
  {
    id: "bfb72c16-c0c9-4d26-8354-e76ee7331dd9",
    title: "Harry Potter I",
    genre: "fantasy",
    year: 2002,
    director: "Chris Columbus",
    minutes: 100,
  },
  {
    id: "59da6b61-e5c6-4de5-961a-7405750bf6c1",
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

  if (method === "GET" && endpoint === "movies" && param) {
    const id = param;
    if (!UUID_REGEX.test(id)) {
      res.writeHead(400);
      res.end("Please prove a valid ID");
      return;
    }

    const movie = db.find((movie) => movie.id === id);

    if (!movie) {
      res.writeHead(404);
      res.end(`Movie with ID ${id} was not found`);
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify(movie));
    return;
  }

  if (method === "POST" && endpoint === "movies" && !param) {
    const title = body["title"];
    const genre = body["genre"];
    const year = parseInt(body["year"]);
    const minutes = parseInt(body["minutes"]);
    const director = body["director"];

    if (!title || typeof title !== "string" || title.length < 2) {
      res.writeHead(400);
      res.end("Please provide a valid movie title");
      return;
    }

    if (!director || typeof director !== "string" || director.length < 2) {
      res.writeHead(400);
      res.end("Please provide a valid movie director");
      return;
    }

    if (!genre || typeof title !== "string" || !VALID_GENRES.includes(genre)) {
      res.writeHead(400);
      res.end(`Please provide a valid movie genre among ${VALID_GENRES}`);
      return;
    }

    if (!year || year < 1850 || year > new Date().getFullYear()) {
      res.writeHead(400);
      res.end(`Please provide a valid year`);
      return;
    }

    if (!minutes || minutes < 2) {
      res.writeHead(400);
      res.end(`Please provide a duration in minutes`);
      return;
    }

    const movie = {
      id: uuidv4(),
      title,
      genre,
      year,
      minutes,
      director,
    };

    db.push(movie);

    res.writeHead(201);
    res.end(JSON.stringify(movie));
    return;
  }

  if (method === "DELETE" && endpoint === "movies" && param) {
    const id = param;
    if (!UUID_REGEX.test(id)) {
      res.writeHead(400);
      res.end("Please a valid ID for deletion");
      return;
    }

    const movie = db.find((movie) => movie.id === id);

    if (!movie) {
      res.writeHead(404);
      res.end(`Movie with ID ${id} was not found`);
      return;
    }

    db = db.filter((movie) => movie.id !== id);

    res.writeHead(200);
    res.end(JSON.stringify(movie));

    return;
  }

  res.writeHead(404);
  res.end("Not found");
}

function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers["authorization"];

  if (apiKey !== process.env.API_KEY) {
    res.writeHead(401);
    res.end("Please provide a valid API KEY");
    return;
  }

  return next(req, res);
}

const server = http.createServer((req, res) => {
  return apiKeyMiddleware(req, res, handleRequest);
});

server.listen(3000, () => {
  console.log("Movies API is running on http://localhost:3000 🚀");
});
