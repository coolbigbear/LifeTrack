Database tables:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

// Haven't done
CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE morning_report (
  id SERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  sleep_duration FLOAT NOT NULL,
  sleep_quality INTEGER NOT NULL,
  mood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL
);

CREATE TABLE evening_report (
  id SERIAL PRIMARY KEY,
  date TEXT NOT NULL,
  sport_exercise FLOAT NOT NULL,
  study FLOAT NOT NULL,
  eating_quality INTEGER NOT NULL,
  mood INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL
);