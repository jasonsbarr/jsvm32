import { indexBy } from "../utils.js";

const types = [
  {
    name: "null",
    code: 0x00,
  },
  {
    name: "ubyte",
    code: 0x01,
  },
  {
    name: "uword",
    code: 0x02,
  },
  {
    name: "uint",
    code: 0x03,
  },
  {
    name: "ulong",
    code: 0x04,
  },
  {
    name: "byte",
    code: 0x05,
  },
  {
    name: "word",
    code: 0x06,
  },
  {
    name: "int",
    code: 0x07,
  },
  {
    name: "long",
    code: 0x08,
  },
  {
    name: "float",
    code: 0x09,
  },
  {
    name: "double",
    code: 0x10,
  },
];

export default indexBy(types, "name");
