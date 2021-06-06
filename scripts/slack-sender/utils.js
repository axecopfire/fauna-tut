const encodeObject = (objToEncode) =>
  Buffer.from(JSON.stringify(objToEncode)).toString("base64");

module.exports = {
  encodeObject,
};
