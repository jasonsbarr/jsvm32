import createMemory from "./memory.js";
import registerNames from "./registers.js";
import execute from "./execute.js";

const registerError = (name) => {
  throw new Error(`No such register: ${name}`);
};

export default class CPU {
  /**
   * Construct a CPU object with the given memory
   * @param {DataView} memory Memory for program and data
   */
  constructor(memory) {
    this.memory = memory;

    // 64 bit registers so they can hold JS numbers and long ints
    this.registers = createMemory(registerNames.length * 8);
    this.registerMap = registerNames.reduce((map, name, i) => {
      map[name] = i * 8;
      return map;
    }, {});
  }

  getRegisterULong(name) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getBigUint64(this.registerMap[name]);
  }

  setRegisterULong(name, value) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setBigUint64(this.registerMap[name], value);
  }

  getRegisterUInt(name, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getUint32(this.registerMap[name], offset);
  }

  setRegisterUInt(name, value, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setUint32(this.registerMap[name] + offset, value);
  }

  getRegisterUWord(name, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getUint16(this.registerMap[name], offset);
  }

  setRegisterUWord(name, value, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setUint16(this.registerMap[name] + offset, value);
  }

  getRegisterUByte(name, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getUint8(this.registerMap[name], offset);
  }

  setRegisterUByte(name, value, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setUint8(this.registerMap[name] + offset, value);
  }

  getRegisterLong(name) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getBigInt64(this.registerMap[name]);
  }

  setRegisterLong(name, value) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setBigInt64(this.registerMap[name], value);
  }

  getRegisterInt(name, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getInt32(this.registerMap[name], offset);
  }

  setRegisterInt(name, value, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setInt32(this.registerMap[name] + offset, value);
  }

  getRegisterFloat(name) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getFloat32(this.registerMap[name]);
  }

  setRegisterFloat(name, value) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setFloat32(this.registerMap[name], value);
  }

  getRegisterDouble(name) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getFloat64(this.registerMap[name]);
  }

  setRegisterDouble(name, value) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setFloat64(this.registerMap[name], value);
  }

  fetchUByte() {
    const nextAddress = this.getRegisterUByte("ip");
    const byte = this.memory.getUint8(nextAddress);
    this.setRegisterUByte("ip", nextAddress + 1);
    return byte;
  }

  fetchUWord() {
    const nextAddress = this.getRegisterUByte("ip");
    const word = this.memory.getUint16(nextAddress);
    this.setRegisterUByte("ip", nextAddress + 2);
    return word;
  }

  fetchUInt() {
    const nextAddress = this.getRegisterUByte("ip");
    const int = this.memory.getUint32(nextAddress);
    this.setRegisterUByte("ip", nextAddress + 4);
    return int;
  }

  fetchULong() {
    const nextAddress = this.getRegisterUByte("ip");
    const long = this.memory.getUint8(nextAddress);
    this.setRegisterUByte("ip", nextAddress + 8);
    return long;
  }

  fetchInt() {
    const nextAddress = this.getRegisterUByte("ip");
    const int = this.memory.getUint32(nextAddress);
    this.setRegisterUByte("ip", nextAddress + 4);
    return int;
  }

  fetchLong() {
    const nextAddress = this.getRegisterUByte("ip");
    const long = this.memory.getUint8(nextAddress);
    this.setRegisterUByte("ip", nextAddress + 8);
    return long;
  }

  fetchFloat() {
    const nextAddress = this.getRegisterUByte("ip");
    const float = this.memory.getFloat32(nextAddress);
    this.setRegisterUByte("ip", nextAddress + 4);
    return float;
  }

  fetchDouble() {
    const nextAddress = this.getRegisterUByte("ip");
    const double = this.memory.getFloat64(nextAddress);
    this.setRegisterUByte("ip", nextAddress + 8);
    return double;
  }

  execute(instruction) {
    return execute(instruction, this);
  }

  step() {
    const instruction = this.fetchUByte();
    return this.execute(instruction);
  }
}
