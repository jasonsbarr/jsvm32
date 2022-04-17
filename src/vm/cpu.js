import createMemory from "./memory.js";
import registerNames from "./registers.js";

export default class CPU {
  constructor(memory) {
    this.memory = memory;

    // 64 bit registers so they can hold JS numbers and long ints
    this.registers = createMemory(registerNames.length * 8);
    this.registerMap = registerNames.reduce((map, name, i) => {
      map[name] = i * 8;
    }, {});
  }
}
