import createMemory from "./memory.js";
import registerNames from "./registers.js";
import types from "./types.js";
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
    this.stackFrameSize = 0;
    // 7 because need the extra 7 bytes to store a double or long
    this.setRegisterUInt("sp", memory.byteLength - 7 - 1);
    this.setRegisterUInt("fp", memory.byteLength - 7 - 1);
    this.setRegisterUInt("bp", memory.byteLength - 7 - 1);
    this.callStart = -1;
  }

  debug() {
    registerNames.forEach((name) => {
      process.stdout.write(`${name}: 0x`);
      for (let i = 0; i < 8; i += 1) {
        process.stdout.write(
          `${this.getRegisterUByte(name, i).toString(16).padStart(2, "0")}`
        );
      }
      process.stdout.write("\n");
    });
    console.log();
  }

  viewMemoryAt(address, n = 8) {
    const nextNBytes = Array.from({ length: n }, (_, i) =>
      this.memory.getUint8(address + i)
    ).map((v) => `0x${v.toString(16).padStart(2, "0")}`);

    console.log(
      `0x${address.toString(16).padStart(4, "0")}: ${nextNBytes.join(" ")}`
    );
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

    return this.registers.setBigUint64(this.registerMap[name], BigInt(value));
  }

  getRegisterUInt(name, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getUint32(this.registerMap[name] + offset);
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

    return this.registers.getUint16(this.registerMap[name] + offset);
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

    return this.registers.getUint8(this.registerMap[name] + offset);
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

    return this.registers.setBigInt64(this.registerMap[name], BigInt(value));
  }

  getRegisterInt(name, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getInt32(this.registerMap[name] + offset);
  }

  setRegisterInt(name, value, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setInt32(this.registerMap[name] + offset, value);
  }

  getRegisterWord(name, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getInt16(this.registerMap[name] + offset);
  }

  setRegisterWord(name, value, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setInt16(this.registerMap[name] + offset, value);
  }

  getRegisterByte(name, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getInt8(this.registerMap[name] + offset);
  }

  setRegisterByte(name, value, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setInt8(this.registerMap[name] + offset, value);
  }

  getRegisterFloat(name, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.getFloat32(this.registerMap[name] + offset);
  }

  setRegisterFloat(name, value, offset = 0) {
    if (!(name in this.registerMap)) {
      return registerError(name);
    }

    return this.registers.setFloat32(this.registerMap[name] + offset, value);
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
    const nextAddress = this.getRegisterUInt("ip");
    const byte = this.memory.getUint8(nextAddress);
    this.setRegisterUInt("ip", nextAddress + 1);
    return byte;
  }

  fetchUWord() {
    const nextAddress = this.getRegisterUInt("ip");
    const word = this.memory.getUint16(nextAddress);
    this.setRegisterUInt("ip", nextAddress + 2);
    return word;
  }

  fetchUInt() {
    const nextAddress = this.getRegisterUInt("ip");
    const int = this.memory.getUint32(nextAddress);
    this.setRegisterUInt("ip", nextAddress + 4);
    return int;
  }

  fetchULong() {
    const nextAddress = this.getRegisterUInt("ip");
    const long = this.memory.getBigUint64(nextAddress);
    this.setRegisterUInt("ip", nextAddress + 8);
    return long;
  }

  fetchByte() {
    const nextAddress = this.getRegisterUInt("ip");
    const byte = this.memory.getInt8(nextAddress);
    this.setRegisterUInt("ip", nextAddress + 1);
    return byte;
  }

  fetchWord() {
    const nextAddress = this.getRegisterUInt("ip");
    const word = this.memory.getInt16(nextAddress);
    this.setRegisterUInt("ip", nextAddress + 2);
    return word;
  }

  fetchInt() {
    const nextAddress = this.getRegisterUInt("ip");
    const int = this.memory.getInt32(nextAddress);
    this.setRegisterUInt("ip", nextAddress + 4);
    return int;
  }

  fetchLong() {
    const nextAddress = this.getRegisterUInt("ip");
    const long = this.memory.getBigInt64(nextAddress);
    this.setRegisterUInt("ip", nextAddress + 8);
    return long;
  }

  fetchFloat() {
    const nextAddress = this.getRegisterUInt("ip");
    const float = this.memory.getFloat32(nextAddress);
    this.setRegisterUInt("ip", nextAddress + 4);
    return float;
  }

  fetchDouble() {
    const nextAddress = this.getRegisterUInt("ip");
    const double = this.memory.getFloat64(nextAddress);
    this.setRegisterUInt("ip", nextAddress + 8);
    return double;
  }

  push(type, value) {
    const address = this.getRegisterUInt("sp");
    switch (type) {
      case types.ubyte.code:
        this.memory.setUint8(address, value);
        this.setRegisterUInt("sp", address - 1);
        this.stackFrameSize += 1;
        return;
      case types.uword.code:
        this.memory.setUint16(address, value);
        this.setRegisterUInt("sp", address - 2);
        this.stackFrameSize += 2;
        return;
      case types.uint.code:
        this.memory.setUint32(address, value);
        this.setRegisterUInt("sp", address - 4);
        this.stackFrameSize += 4;
        return;
      case types.ulong.code:
        this.memory.setBigUint64(address, value);
        this.setRegisterUInt("sp", address - 8);
        this.stackFrameSize += 8;
        return;
      case types.byte.code:
        this.memory.setInt8(address, value);
        this.setRegisterUInt("sp", address - 1);
        this.setRegisterUInt("bp", address - 1);
        this.stackFrameSize += 1;
        return;
      case types.word.code:
        this.memory.setInt16(address, value);
        this.setRegisterUInt("sp", address - 2);
        this.setRegisterUInt("bp", address - 2);
        this.stackFrameSize += 2;
        return;
      case types.int.code:
        this.memory.setInt32(address, value);
        this.setRegisterUInt("sp", address - 4);
        this.stackFrameSize += 4;
        return;
      case types.long.code:
        this.memory.setBigInt64(address, value);
        this.setRegisterUInt("sp", address - 8);
        this.setRegisterUInt("bp", address - 8);
        this.stackFrameSize += 8;
        return;
      case types.float.code:
        this.memory.setFloat32(address, value);
        this.setRegisterUInt("sp", address - 4);
        this.stackFrameSize += 4;
        return;
      case types.double.code:
        this.memory.setFloat64(address, value);
        this.setRegisterUInt("sp", address - 8);
        this.stackFrameSize += 8;
        return;
      default:
        throw new Error(`Unknown type 0x${type.toString(16).padStart(2, "0")}`);
    }
  }

  pop(type) {
    let address = this.getRegisterUInt("sp");
    let value;
    switch (type) {
      case types.ubyte.code:
        address += 1;
        value = this.memory.getUint8(address);
        this.setRegisterUInt("sp", address);
        this.stackFrameSize -= 1;
        return value;
      case types.uword.code:
        address += 2;
        value = this.memory.getUint16(address);
        this.setRegisterUInt("sp", address);
        this.stackFrameSize -= 2;
        return value;
      case types.uint.code:
        address += 4;
        value = this.memory.getUint32(address);
        this.setRegisterUInt("sp", address);
        this.stackFrameSize -= 4;
        return value;
      case types.ulong.code:
        address += 8;
        value = this.memory.getBigUint64(address);
        this.setRegisterUInt("sp", address);
        this.stackFrameSize -= 8;
        return value;
      case types.byte.code:
        address += 1;
        value = this.memory.getInt8(address);
        this.setRegisterUInt("sp", address);
        this.stackFrameSize -= 1;
        return value;
      case types.word.code:
        address += 2;
        value = this.memory.getInt16(address);
        this.setRegisterUInt("sp", address);
        this.stackFrameSize -= 2;
        return value;
      case types.int.code:
        address += 4;
        value = this.memory.getInt32(address);
        this.setRegisterUInt("sp", address);
        this.stackFrameSize -= 4;
        return value;
      case types.long.code:
        address += 8;
        value = this.memory.getBigInt64(address);
        this.setRegisterUInt("sp", address);
        this.stackFrameSize -= 8;
        return value;
      case types.float.code:
        address += 4;
        value = this.memory.getFloat32(address);
        this.setRegisterUInt("sp", address);
        this.stackFrameSize -= 4;
        return value;
      case types.double.code:
        address += 8;
        value = this.memory.getFloat64(address);
        this.setRegisterUInt("sp", address);
        this.stackFrameSize -= 8;
        return value;
      default:
        throw new Error(`Unknown type 0x${type.toString(16).padStart(2, "0")}`);
    }
  }

  pushState() {
    const nBytes = this.getRegisterUInt("sp");
    this.push(types.ulong.code, this.getRegisterULong("r1"));
    this.push(types.ulong.code, this.getRegisterULong("r2"));
    this.push(types.ulong.code, this.getRegisterULong("r3"));
    this.push(types.ulong.code, this.getRegisterULong("r4"));
    this.push(types.ulong.code, this.getRegisterULong("r5"));
    this.push(types.ulong.code, this.getRegisterULong("r6"));
    this.push(types.ulong.code, this.getRegisterULong("r7"));
    this.push(types.ulong.code, this.getRegisterULong("r8"));
    this.push(types.ulong.code, this.getRegisterULong("ip"));
    this.push(types.uint.code, this.stackFrameSize + 4);

    this.setRegisterUInt("fp", this.getRegisterUInt("sp"));
    this.setRegisterUInt(
      "sp",
      this.getRegisterUInt("sp") - this.stackFrameSize + nBytes
    );
    this.setRegisterUInt("bp", this.getRegisterUInt("sp") - nBytes);
    this.stackFrameSize = 0;
  }

  popState() {
    const fp = this.getRegisterUInt("fp");
    this.setRegisterUInt("sp", fp);
    this.stackFrameSize = this.pop(types.uint.code);
    const stackFrameSize = this.stackFrameSize;

    this.setRegisterULong("ip", this.pop(types.ulong.code));
    this.setRegisterULong("r8", this.pop(types.ulong.code));
    this.setRegisterULong("r7", this.pop(types.ulong.code));
    this.setRegisterULong("r6", this.pop(types.ulong.code));
    this.setRegisterULong("r5", this.pop(types.ulong.code));
    this.setRegisterULong("r4", this.pop(types.ulong.code));
    this.setRegisterULong("r3", this.pop(types.ulong.code));
    this.setRegisterULong("r2", this.pop(types.ulong.code));
    this.setRegisterULong("r1", this.pop(types.ulong.code));

    const nBytes = this.pop(types.uint.code);
    for (let i = 0; i < nBytes; i++) {
      this.pop(types.ubyte.code);
    }

    this.setRegisterUInt("fp", fp + stackFrameSize);
  }

  fetchRegisterName() {
    return registerNames[this.fetchUByte() % registerNames.length];
  }

  execute(instruction) {
    return execute(instruction, this);
  }

  step() {
    const instruction = this.fetchUByte();
    return this.execute(instruction);
  }

  run() {
    const halt = this.step();
    if (!halt) {
      setImmediate(() => this.run());
    }
  }
}
