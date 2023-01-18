const client = require("./client");
const { users } = require("./seedData");

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
        firstName VARCHAR(255), 
        lastName VARCHAR (255),
        username VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL
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
