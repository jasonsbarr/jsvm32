import createMemory from "./memory.js";
import registerNames from "./registers.js";

const registerError = (name) => {
  throw new Error(`No such register: ${name}`);
};

export default class CPU {
  constructor(memory) {
    this.memory = memory;

    // 64 bit registers so they can hold JS numbers and long ints
    this.registers = createMemory(registerNames.length * 8);
    this.registerMap = registerNames.reduce((map, name, i) => {
      map[name] = i * 8;
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
}
