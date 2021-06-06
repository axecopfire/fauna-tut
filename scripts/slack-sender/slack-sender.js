#!/usr/bin/env node

const updateTodo = require("./opts/updateTodo");
const requestAllTodos = require("./opts/allTodos");

requestAllTodos()
  // .then(console.log)
  .then((resp) => updateTodo(resp))
  .catch((err) => console.error("here", err));
