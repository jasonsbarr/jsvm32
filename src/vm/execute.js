import instructions from "../instructions.js";

export default (instruction) => {
  switch (instruction.opcode) {
    case instructions.MOV_LIT_REG:
    case instructions.MOV_REG_REG:
    case instructions.MOV_REG_MEM:
    case instructions.MOV_MEM_REG:
    case instructions.ADD_REG_REG:
    case instructions.JMP_NOT_EQ:
    default:
      throw new Error(`${instruction.instruction} not found`);
  }
};
