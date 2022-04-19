import instructions from "../instructions.js";
import types from "./types.js";
import registers from "./registers.js";
// silence unused declaration error
// eslint-disable-next-line
import CPU from "./cpu.js";

/**
 *
 * @param {Number} type
 * @param {CPU} cpu
 * @returns {Number}
 */
const fetchOnType = (type, cpu) => {
  switch (type) {
    case types.ubyte.code:
      return cpu.fetchUByte();
    case types.uword.code:
      return cpu.fetchUWord();
    case types.uint.code:
      return cpu.fetchUInt();
    case types.ulong.code:
      return cpu.fetchULong();
    case types.byte.code:
      return cpu.fetchByte();
    case types.word.code:
      return cpu.fetchWord();
    case types.int.code:
      return cpu.fetchInt();
    case types.long.code:
      return cpu.fetchLong();
    case types.float.code:
      return cpu.fetchFloat();
    case types.double.code:
      return cpu.fetchDouble();
    default:
      throw new Error(`Unknown type 0x${type.toString(16).padStart(2, "0")}`);
  }
};

/**
 *
 * @param {Number} type
 * @param {String} register
 * @param {Number} value
 * @param {CPU} cpu
 */
const setOnType = (type, register, value, cpu) => {
  switch (type) {
    case types.ubyte.code:
      return cpu.setRegisterUByte(register, value);
    case types.uword.code:
      return cpu.setRegisterUWord(register, value);
    case types.uint.code:
      return cpu.setRegisterUInt(register, value);
    case types.ulong.code:
      return cpu.setRegisterULong(register, value);
    case types.byte.code:
      throw new Error("Setting byte in register not defined");
    case types.word.code:
      throw new Error("Setting word in register not defined");
    case types.int.code:
      return cpu.setRegisterInt(register, value);
    case types.long.code:
      return cpu.setRegisterLong(register, value);
    case types.float.code:
      return cpu.setRegisterFloat(register, value);
    case types.double.code:
      return cpu.setRegisterDouble(register, value);
    default:
      throw new Error(`Unknown type ox${type.toString(16).padStart(2, "0")}`);
  }
};

/**
 *
 * @param {Number} type
 * @param {String} register
 * @param {CPU} cpu
 * @returns {Number}
 */
const getOnType = (type, register, cpu) => {
  switch (type) {
    case types.ubyte.code:
      return cpu.getRegisterUByte(register);
    case types.uword.code:
      return cpu.getRegisterUWord(register);
    case types.uint.code:
      return cpu.getRegisterUInt(register);
    case types.ulong.code:
      return cpu.getRegisterULong(register);
    case types.byte.code:
      throw new Error("Getting byte from register not defined");
    case types.word.code:
      throw new Error("Getting word from register not defined");
    case types.int.code:
      return cpu.getRegisterInt(register);
    case types.long.code:
      return cpu.getRegisterLong(register);
    case types.float.code:
      return cpu.getRegisterFloat(register);
    case types.double.code:
      return cpu.getRegisterDouble(register);
    default:
      throw new Error(`Unknown type 0x${type.toString(16).padStart(2, "0")}`);
  }
};

/**
 * Sets a register's bytes to all zeroes
 * @param {String} register
 * @param {CPU} cpu
 */
const zeroRegister = (register, cpu) => {
  cpu.setRegisterULong(register, 0n);
};

/**
 * Executes the instruction given to the CPU
 * @param {Number} instruction
 * @param {CPU} cpu
 */
export default (instruction, cpu) => {
  switch (instruction) {
    case instructions.MOV_LIT_REG.opcode: {
      const type = cpu.fetchUByte();
      const literal = fetchOnType(type, cpu);
      const register = registers[cpu.fetchUByte() % registers.length];
      zeroRegister();
      setOnType(type, register, literal, cpu);
      return;
    }
    case instructions.MOV_REG_REG.opcode: {
      const type = cpu.fetchUByte();
      const regFrom = registers[cpu.fetchUByte() % registers.length];
      const regTo = registers[cpu.fetchUByte() % registers.length];
      const value = getOnType(type, regFrom, cpu);
      // first, zero out the value in the register we're moving to
      zeroRegister();
      setOnType(type, regTo, value, cpu);
      return;
    }
    case instructions.MOV_REG_MEM.opcode:
    case instructions.MOV_MEM_REG.opcode:
    case instructions.ADD_REG_REG.opcode:
    case instructions.JMP_NOT_EQ.opcode:
    default:
      throw new Error(
        `Instruction ${instruction.toString(16).padStart(2, "0")} not found`
      );
  }
};
