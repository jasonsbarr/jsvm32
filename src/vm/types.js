import { indexBy } from "../utils.js";

const types = [
  {
    name: "ubyte",
    code: 0x00,
  },
  {
    name: "uword",
    code: 0x01,
  },
  {
    name: "uint",
    code: 0x02,
  },
  {
    name: "ulong",
    code: 0x03,
  },
  {
    name: "byte",
    code: 0x04,
  },
  {
    name: "word",
    code: 0x05,
  },
  {
    name: "int",
    code: 0x06,
  },
  {
    name: "long",
    code: 0x07,
  },
  {
    name: "float",
    code: 0x08,
  },
  {
    name: "double",
    code: 0x09,
  },
];

export default indexBy(types, "name");
