const http = require("http");

const VALID_GENRES = ["comedy", "drama", "terror", "fantasy"];

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

  if (method === "GET" && endpoint === "movies" && param) {
    const id = parseInt(param);
    if (!id) {
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
      id: db.length + 1,
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

  res.writeHead(404);
  res.end("Not found");
}

const server = http.createServer(handleRequest);

server.listen(3000, () => {
  console.log("Movies API is running on http://localhost:3000 🚀");
});
