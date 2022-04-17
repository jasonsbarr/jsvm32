import instructions from "../instructions.js";
// eslint-disable-next-line
import CPU from "./cpu.js";

/**
 * Executes the instruction given to the CPU
 * @param {Number} instruction
 * @param {CPU} cpu
 */
export default (instruction, cpu) => {
  switch (instruction) {
    case instructions.MOV_LIT_REG.opcode:
    case instructions.MOV_REG_REG.opcode:
    case instructions.MOV_REG_MEM.opcode:
    case instructions.MOV_MEM_REG.opcode:
    case instructions.ADD_REG_REG.opcode:
    case instructions.JMP_NOT_EQ.opcode:
    default:
      throw new Error(`${instruction.instruction} not found`);
  }
};
