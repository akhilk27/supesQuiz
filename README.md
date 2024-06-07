# SupesQuiz

SupesQuiz is a web-based quiz application that tests your knowledge of superheroes and their real names. The application fetches questions from a PostgreSQL database and keeps track of the highest score.

## Features

- Randomly selects a superhero and asks for their real name.
- Tracks and displays the current and highest scores.
- Updates the highest score and player's name when a new high score is achieved.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- EJS for templating
- HTML, CSS for frontend

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- PostgreSQL installed and running.
- A PostgreSQL database with the necessary tables (`supes` and `game_stats`).

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/SupesQuiz.git
   cd SupesQuiz
   ```

## Installing dependencies

``` npm install ```


## Set up the database

1. Create a Postgres database (with the name 'world').
2. Run the following queries to create the necessary tables:

```
CREATE TABLE supes (
  id SERIAL PRIMARY KEY,
  superhero VARCHAR(255) NOT NULL,
  realname VARCHAR(255) NOT NULL
);

CREATE TABLE game_stats (
  id SERIAL PRIMARY KEY,
  highest_score INTEGER DEFAULT 0,
  highest_score_player VARCHAR(255) DEFAULT ''
);

-- Insert your initial data into the supes table.
-- Make sure to have one row in game_stats table to start with.
INSERT INTO game_stats (highest_score, highest_score_player) VALUES (0, '');
```


## Update the backend code

Update this part of the code to the new database name and password.

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "your-database",
  password: "your-password",
  port: 5432
});


## Run the application

``` npm start ```
