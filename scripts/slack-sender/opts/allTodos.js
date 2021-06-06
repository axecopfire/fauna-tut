const http = require("http");
const options = require("./options");

module.exports = function requestAllTodos() {
  return new Promise((resolve, reject) => {
    // All todos
    const allTodoOptions = {
      ...options,
      path: `${options.path}/todos-read-all`,
      method: "GET",
    };
    console.log({ allTodoOptions });

    function allTodos(response) {
      let str = "";

      response.on("data", function (chunk) {
        str += chunk;
      });

      response.on("end", function () {
        let todos = JSON.parse(str);
        todos = todos.map((todo) => ({
          id: todo.ref["@ref"].id,
          data: todo.data,
        }));
        return resolve(todos);
      });
      response.on("error", reject);
    }
    try {
      http.request(allTodoOptions, allTodos).end();
    } catch (err) {
      reject(err);
    }
  });
};
