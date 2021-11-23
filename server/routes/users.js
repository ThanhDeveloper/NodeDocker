var express = require('express');
var router = express.Router();
const userService = require('../services/users-service');
require('dotenv').config();

router.get('/', async function (req, res, next) {
  try {
    res.json(await userService.getUsers());
  } catch (err) {
    res.status(err.statusCode || 500).json({ 'message': err.message });
  }
});

router.post('/', async function (req, res, next) {
  try {
    res.status(200).send(await userService.addUser(req.body));
  } catch (err) {
    res.status(err.statusCode || 500).json({ 'message': err.message });
  }
});

router.patch('/', async function (req, res, next) {
  try {
    await userService.updateUser(req.body)
    res.status(204).send();
  } catch (err) {
    res.status(err.statusCode || 500).json({ 'message': err.message });
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const deleteId = req.params.id;
    await userService.deleteUser(deleteId);
    res.status(204).send();
  } catch (err) {
    res.status(err.statusCode || 500).json({ 'message': err.message });
  }
});

module.exports = router;
