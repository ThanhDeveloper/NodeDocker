var connectionService = require('./connection-service')

async function getUsers() {
  const rows = await connectionService.query('SELECT * from d_users', []);
  return rows;
}

async function addUser(user) {
  const rows = await connectionService.query('INSERT INTO d_users ("name", "age")  VALUES ($1, $2) RETURNING *', [user.name, user.age]);
  return rows;
}

async function updateUser(user) {
  await connectionService.query('UPDATE  d_users SET name = $1, age = $2 WHERE id = $3', [user.name, user.age, user.id]);
}

async function deleteUser(id) {
  await connectionService.query('DELETE FROM d_users WHERE id = $1', [id]);
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser
}
