const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const PORT = process.env.PORT || 3000;
const app = express();

// connect to mongodb
MONGO_DB_URI =
  "mongodb+srv://dbUser:1029384756@cluster1.gskfs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// using promises instead of callbacks
MongoClient.connect(MONGO_DB_URI, { useUnifiedTopology: true })
  .then((client) => {
    console.log("CONNECTED TO THE DATABASE!");
    const db = client.db("star-wars-movies");
    const moviesCollection = db.collection("movies");
    // middlewares
    app.set("view engine", "ejs");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));

    // routes

    // GET
    app.get("/", (req, res) => {
      db.collection("movies")
        .find()
        .toArray()
        .then((movies) => {
          res.render("index.ejs", { movies: movies });
        })
        .catch(/* ... */);
    });

    // POST
    app.post("/movies", (req, res) => {
      moviesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));

      // PUT
      app.put("/movies", (req, res) => {
        moviesCollection
          .findOneAndUpdate(
            { name: "Return Of The Jedi" },
            {
              $set: {
                name: req.body.name,
                movie: req.body.movie,
              },
            },
            { upsert: true },
          )
          .then((result) => {
            res.json("Success!");
          })
          .catch((error) => console.error(error));
      });

      // DELETE
      app.delete("/movies", (req, res) => {
        moviesCollection
          .deleteOne({ name: req.body.name })
          .then((result) => {
            if (result.deletedCount === 0) {
              return res.json("No movie to delete");
            }
            res.json("Deleted movie");
          })
          .catch((error) => console.error(error));
      });

      app.listen(PORT, () =>
        console.log(`Server listening at localhost:${PORT}`),
      );
    });
  })
  .catch(console.error);
