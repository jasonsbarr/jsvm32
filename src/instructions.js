import { indexBy } from "./utils.js";

const metadata = [
  {
    instruction: "MOV_LIT_REG",
    opcode: 0x10,
    name: "mov",
  },
  {
    instruction: "MOV_REG_REG",
    opcode: 0x11,
    name: "mov",
  },
  {
    instruction: "MOV_REG_MEM",
    opcode: 0x12,
    name: "mov",
  },
  {
    instruction: "MOV_MEM_REG",
    opcode: 0x13,
    name: "mov",
  },
  {
    instruction: "ADD_REG_REG",
    opcode: 0x14,
    name: "add",
  },
  {
    instruction: "JMP_NOT_EQ",
    opcode: 0x15,
    name: "jne",
  },
];

export default indexBy(metadata, "instruction");
