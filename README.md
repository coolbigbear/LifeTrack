DATABASE:
Database tables used:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

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


RUNNING:

Application is available online at:
https://lifetrack-project.herokuapp.com/

Application can be run locally using this command while in the project root folder - last argument is the port number the application should run on (if ommitted will default to port 7777):
deno run --allow-env --allow-read --allow-net --unstable app.js 54321

Database credentials should be set in a ".env" file (That is the literal file name).
Format of the file is as follows:
DB_HOSTNAME=
DB_DATABASE=
DB_USER=
DB_PASSWORD=
DB_PORT=

TEST_DB_HOSTNAME=
TEST_DB_DATABASE=
TEST_DB_USER=
TEST_DB_PASSWORD=
TEST_DB_PORT=

First section is used during normal application operation, environment variables preceded with 'TEST' are used during testing.


TESTING:

All test can be run using the following command:
TEST_ENVIRONMENT=true deno test --allow-read --allow-net --allow-env --unstable

NOTE!!!
First time tests are run on a fresh database with tables empty, some tests will fail!
This is due to tests not handling redirects properly!
Second run of tests will make all tests pass as first run creates neccessery data inside the tables!


EXTRA NOTES:

The reporting behaviour section has both the morning and evening forms on the same page. 
They are hidden according to the radio buttons clicked by the user. This is done using a static javascript file.

The weekly and monthly summaries are on the same page but function independently.
When selecting a weekly summary the data is for the selected week only i.e. if week 50 of 2020 is selected it'll show a summary of Dec 7th to Dec 13th
When selecting a monthly summary the data is for the selected month only i.e. if January 2020 is selected it'll show a summary from January 1st to January 31st

Bootstrap is used as the CSS framework

