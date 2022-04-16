import instructions from "./instructions.js";

const indexBy = (arr, prop) =>
  arr.reduce((output, item) => {
    output[item[prop]] = item;
    return output;
  }, {});

export default indexBy(instructions, "instruction");
