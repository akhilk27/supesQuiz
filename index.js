import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "Akhilesh@27",
  port: 5432
});

const app = express();
const port = 3000;

db.connect();

let quiz = [];

db.query("Select * from supes", (err,res) => {
  if (err){
    console.log("Error while reading Database", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
});

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let superHero = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(superHero);
  res.render("index.ejs", { question: superHero });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (superHero.realname.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: superHero,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomHero = quiz[Math.floor(Math.random() * quiz.length)];

  superHero = randomHero;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
