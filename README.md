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

``` npx nodemon index.js ```

The server will start and be accessible at http://localhost:3000.


## File Structure
index.js: Main server file, handles routes and database interactions.
views/: Contains EJS templates for rendering the frontend.
public/: Contains static assets like CSS and images.
styles/: Contains CSS files for styling the application.

## Usage
Open a web browser and navigate to http://localhost:3000.
Answer the questions by typing the real name of the superhero and hitting submit.
If your score exceeds the highest score, you will be prompted to enter your name.
The game will display the highest score and the player who achieved it.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes or additions you would like to make.

## License
This project is open-source and available under the MIT License.

## Acknowledgements
- Node.js
- Express.js
- PostgreSQL
- EJS
