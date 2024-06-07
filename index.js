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
let highestScore = 0;
let highestScorePlayer = "";

// Fetch quiz data
db.query("SELECT * FROM supes", (err, res) => {
  if (err) {
    console.log("Error while reading Database", err.stack);
  } else {
    quiz = res.rows;
  }
});

// Fetch highest score data
const fetchHighestScore = async () => {
  try {
    const res = await db.query("SELECT * FROM game_stats");
    highestScore = res.rows[0].highest_score || 0;
    highestScorePlayer = res.rows[0].highest_score_player || "";
  } catch (err) {
    console.log("Error while reading Database", err.stack);
  }
};

// Initial fetch of highest score
fetchHighestScore();

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
  res.render("index.ejs", { question: superHero, highestScore, highestScorePlayer });
});

// POST a new post
app.post("/submit", async (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (superHero.realname.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  // Check if the current score is higher than the highest score
  if (!isCorrect && (totalCorrect > highestScore)) {
    // If the current score is higher, render the name-entry.ejs template
    res.render("name-entry.ejs");
  } else {
    await nextQuestion();
    res.render("index.ejs", {
      question: superHero,
      wasCorrect: isCorrect,
      totalScore: totalCorrect,
      highestScore,
      highestScorePlayer
    });
  }
});

// Handle name submission
app.post("/submit-name", async (req, res) => {
  const playerName = req.body.name.trim();

  // Update highest score and highest score player in the game_stats table
  await db.query(`UPDATE game_stats SET highest_score = ${totalCorrect}, highest_score_player = '${playerName}'`);

  // Reset the game state
  totalCorrect = 0;

  // Re-fetch the highest score to ensure the updated score is reflected
  await fetchHighestScore();

  await nextQuestion();
  res.render("index.ejs", {
    question: superHero,
    wasCorrect: true,
    totalScore: totalCorrect,
    highestScore,
    highestScorePlayer
  });
});

async function nextQuestion() {
  const randomHero = quiz[Math.floor(Math.random() * quiz.length)];
  superHero = randomHero;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
