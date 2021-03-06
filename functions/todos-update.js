import faunadb from "faunadb";
import getId from "./utils/getId";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.handler = (event, context, callback) => {
  console.log("Hello? lambda");
  let body = event.body;
  console.log({ event });
  if (event.isBase64Encoded) {
    body = Buffer.from(event.body, "base64").toString();
    // body = body.toString();
    console.log("isBase64Encoded");
  }
  console.log({ body, context });
  const data = JSON.parse(body);
  const id = getId(event.path);
  console.log(`Function 'todo-update' invoked. update id: ${id}`);
  return client
    .query(q.Update(q.Ref(`classes/todos/${id}`), { data }))
    .then((response) => {
      console.log("success", response);
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      });
    })
    .catch((error) => {
      console.log("error", error);
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      });
    });
};
