import { indexBy } from "./utils.js";

const metadata = [
  {
    instruction: "HLT",
    opcode: 0x00,
    name: "hlt",
  },
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
  {
    instruction: "PSH_LIT",
    opcode: 0x17,
    name: "psh",
  },
  {
    instruction: "PSH_REG",
    opcode: 0x18,
    name: "psh",
  },
  {
    instruction: "POP",
    opcode: 0x1a,
    name: "pop",
  },
  {
    instruction: "CAL_LIT",
    opcode: 0x5e,
    name: "cal",
  },
  {
    instruction: "CAL_REG",
    opcode: 0x5f,
    name: "cal",
  },
  {
    instruction: "RET",
    opcode: 0x60,
    name: "ret",
  },
];

export default indexBy(metadata, "instruction");
