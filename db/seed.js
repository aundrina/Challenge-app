const client = require("./client");
const { users } = require("./seedData");
const { createUser } = require("./adapters/users");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS challengers;
        DROP TABLE IF EXISTS challenger_activities;
        DROP TABLE IF EXISTS activities;
        DROP TABLE IF EXISTS admins;
        `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.log("Error dropping tables!");
    throw error;
  }
}
async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL, 
        lastName VARCHAR (255) NOT NULL,
        username VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL,
        Email VARCHAR (255) NOT NULL,
        is_admin BOOLEAN DEFAULT false,
        imageURL
    )
    `);
    await client.query(`
        CREATE TABLE challengers (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT false,
        name VARCHAR(255)  NOT NULL,
        coachesName VARCHAR(255) NOT NULL,
        goal VARCHAR(255) NOT NULL
    )
    `);
    await client.query(`
      CREATE TABLE challenger_ativities (
        id SERIAL PRIMARY KEY,
        challenger_id VARCHAR(255) NOT NULL, 
        challengerActivity_id VARCHAR (255) NOT NULL,
        is_admin BOOLEAN DEFAULT false
    )
    `);
    await client.query(`
     CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        admin_id VARCHAR(255) NOT NULL,
        challengeName VARCHAR (50) NOT NULL,
        timestamp BOOLEAN DEFAULT false,
        date VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        challengeType VARCHAR(255) NOT NULL,
        imageURL 
    )
    `);
    await client.query(`
    CREATE TABLE admin (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    )
    `);
    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables");
    throw error;
  }
}

const seedDb = async () => {
  console.log(`...sedding users`);
  for (const user of users) {
    console.log("User: ", user);
    await createSecureServer(user);
  }
};

const rebuildDb = async () => {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await seedDb();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};
rebuildDb();
