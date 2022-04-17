export const indexBy = (arr, prop) =>
  arr.reduce((output, item) => {
    output[item[prop]] = item;
    return output;
  }, {});
