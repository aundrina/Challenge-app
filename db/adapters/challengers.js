async function createChallenge({ user_id, isAdmin, name, coachName, goal }) {
  try {
    const rows = await client.query(
      `
        INSERT INTO challengers(user_id, isAdmin, name, coachesName, goal)
        VALUES ($1, $2, $3, $4, $5)
        `,
      [user_id, isAdmin, name, coachName, goal]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
