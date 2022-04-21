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
      return cpu.setRegisterByte(register, value);
    case types.word.code:
      return cpu.setRegisterWord(register, value);
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
      return cpu.getRegisterByte(register);
    case types.word.code:
      return cpu.getRegisterWord(register);
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
 * Sets the value at a memory address based on the type of the value
 * @param {Number} type
 * @param {Number} address
 * @param {Number} value
 * @param {CPU} cpu
 */
const setMemOnType = (type, address, value, cpu) => {
  switch (type) {
    case types.ubyte.code:
      return cpu.memory.setUint8(address, value);
    case types.uword.code:
      return cpu.memory.setUint16(address, value);
    case types.uint.code:
      return cpu.memory.setUint32(address, value);
    case types.ulong.code:
      return cpu.memory.setBigUint64(address, value);
    case types.byte.code:
      return cpu.memory.setInt8(address, value);
    case types.word.code:
      return cpu.memory.setInt16(address, value);
    case types.int.code:
      return cpu.memory.setInt32(address, value);
    case types.long.code:
      return cpu.memory.setBigInt64(address, value);
    case types.float.code:
      return cpu.memory.setFloat32(address, value);
    case types.double.code:
      return cpu.memory.setFloat64(address, value);
    default:
      throw new Error(`Unknown type 0x${type.toString(16).padStart(2, "0")}`);
  }
};

/**
 * Get value from a memory address based on the value's type
 * @param {Number} type
 * @param {Number} address
 * @param {CPU} cpu
 */
const getMemOnType = (type, address, cpu) => {
  switch (type) {
    case types.ubyte.code:
      return cpu.memory.getUint8(address);
    case types.uword.code:
      return cpu.memory.getUint16(address);
    case types.uint.code:
      return cpu.memory.getUint32(address);
    case types.ulong.code:
      return cpu.memory.getBigUint64(address);
    case types.byte.code:
      return cpu.memory.getInt8(address);
    case types.word.code:
      return cpu.memory.getInt16(address);
    case types.int.code:
      return cpu.memory.getInt32(address);
    case types.long.code:
      return cpu.memory.getBigInt64(address);
    case types.float.code:
      return cpu.memory.getFloat32(address);
    case types.double.code:
      return cpu.memory.getFloat64(address);
    default:
      throw new Error(`Unknown type 0x${type.toString(16).padStart(2, "0")}`);
  }
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
      zeroRegister(register, cpu);
      setOnType(type, register, literal, cpu);
      return;
    }

    case instructions.MOV_REG_REG.opcode: {
      const type = cpu.fetchUByte();
      const regFrom = registers[cpu.fetchUByte() % registers.length];
      const regTo = registers[cpu.fetchUByte() % registers.length];
      const value = getOnType(type, regFrom, cpu);
      // first, zero out the value in the register we're moving to
      zeroRegister(regTo, cpu);
      setOnType(type, regTo, value, cpu);
      return;
    }

    case instructions.MOV_REG_MEM.opcode: {
      const type = cpu.fetchUByte();
      const regFrom = registers[cpu.fetchUByte() % registers.length];
      const address = cpu.fetchUInt();
      const value = getOnType(type, regFrom, cpu);
      setMemOnType(type, address, value, cpu);
      return;
    }

    case instructions.MOV_MEM_REG.opcode: {
      const type = cpu.fetchUByte();
      const address = cpu.fetchUInt();
      const regTo = registers[cpu.fetchUByte() % registers.length];
      const value = getMemOnType(type, address, cpu);
      zeroRegister(regTo, cpu);
      setOnType(type, regTo, value, cpu);
      return;
    }

    case instructions.ADD_REG_REG.opcode: {
      const type = cpu.fetchUByte();
      const r1 = registers[cpu.fetchUByte() % registers.length];
      const r2 = registers[cpu.fetchUByte() % registers.length];
      const r1Value = getOnType(type, r1, cpu);
      const r2Value = getOnType(type, r2, cpu);
      zeroRegister("acc", cpu);
      setOnType(type, "acc", r1Value + r2Value, cpu);
      return;
    }

    case instructions.JMP_NOT_EQ.opcode: {
      const type = cpu.fetchUByte();
      const value = fetchOnType(type, cpu);
      const address = cpu.fetchUInt();

      if (value !== getOnType(type, "acc", cpu)) {
        cpu.setRegisterInt("ip", address);
      }

      return;
    }

    case instructions.PSH_LIT.opcode:
    case instructions.PSH_REG.opcode:
    case instructions.POP.opcode:
    case instructions.CAL_LIT.opcode:
    case instructions.CAL.REG.opcode:
    case instructions.RET.opcode:

    default:
      throw new Error(
        `Instruction ${instruction.toString(16).padStart(2, "0")} not found`
      );
  }
};
