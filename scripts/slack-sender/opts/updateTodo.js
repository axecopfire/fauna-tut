const http = require("http");
const options = require("./options");
const { encodeObject } = require("../utils");

module.exports = function updateTodos(todoList) {
  console.log({ todoList });
  const data = JSON.stringify({
    title: "todo 4",
    // completed: true,
  });
  return new Promise((resolve, reject) => {
    let todoId = "300502562352660996";
    const updateTodoOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
      path: `${options.path}/todos-update/${todoId}`,
      method: "POST",
      body: data,
    };

    function updateTodo(response) {
      var str = "";

      //another chunk of data has been received, so append it to `str`
      response.on("data", function (chunk) {
        str += chunk;
      });

      //the whole response has been received, so we just print it out here
      response.on("end", function () {
        // console.log({ str });
        let todos;
        try {
          todos = JSON.parse(str);
        } catch (err) {
          return reject(err);
        }
        console.log(todos);
        console.log(response.statusCode);
        resolve(str);
      });

      response.on("error", reject);
    }
    console.log({ updateTodoOptions });
    const updateTodoReq = http.request(updateTodoOptions, updateTodo);
    // console.log({ updateTodoReq });
    // console.log("parse", JSON.parse(updateTodoOptions.body));
    updateTodoReq.write(data);
    // updateTodoReq.write("hi");
    updateTodoReq.end();
  });
};
