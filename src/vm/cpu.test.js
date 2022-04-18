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
  });

  it("Stores a UInt64 in a register and retrieves it", () => {
    cpu.setRegisterULong("r1", 10n);
    expect(cpu.getRegisterULong("r1")).toEqual(10n);
  });

  it("Stores a UInt32 in a register and retrieves it", () => {
    cpu.setRegisterUInt("r2", 256);
    expect(cpu.getRegisterUInt("r2")).toEqual(256);
  });

  it("Stores a UInt32 in a register at an offset and retrieves it", () => {
    cpu.setRegisterUInt("r2", 100, 4);
    expect(cpu.getRegisterUInt("r2", 4)).toEqual(100);
  });
});
