import memory from "./memory.js";
import CPU from "./cpu.js";

const cpu = new CPU(memory(256));

describe("Initializing a CPU object", () => {
  it("Creates a new object", () => {
    expect(typeof cpu).toEqual("object");
  });

  it("Stores its memory object for its program and data", () => {
    expect(cpu.memory instanceof DataView).toBe(true);
  });

  it("Initializes registers", () => {
    expect(cpu.registers instanceof DataView).toBe(true);
    expect(cpu.floatRegisters instanceof DataView).toBe(true);
  });
});
