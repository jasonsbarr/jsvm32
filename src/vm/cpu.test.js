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

  it("Stores a UInt16 in a register and retrieves it", () => {
    cpu.setRegisterUWord("r3", 1024);
    expect(cpu.getRegisterUWord("r3")).toEqual(1024);
  });

  it("Stores a UInt16 in a register at an offset and retrieves it", () => {
    cpu.setRegisterUWord("r3", 256, 2);
    expect(cpu.getRegisterUWord("r3", 2)).toEqual(256);
  });

  it("Stores a UInt8 in a register and retrieves it", () => {
    cpu.setRegisterUByte("r4", 156);
    expect(cpu.getRegisterUByte("r4")).toEqual(156);
  });

  it("Stores a UInt8 in a register at an offset and retrieves it", () => {
    cpu.setRegisterUByte("r4", 200, 1);
    expect(cpu.getRegisterUByte("r4", 1)).toEqual(200);
  });

  it("Stores an Int64 in a register and retrieves it", () => {
    cpu.setRegisterLong("r5", -56n);
    expect(cpu.getRegisterLong("r5")).toEqual(-56n);
  });

  it("Stores an Int32 in a register and retrieves it", () => {
    cpu.setRegisterInt("r6", -256);
    expect(cpu.getRegisterInt("r6")).toEqual(-256);
  });

  it("Stores an Int32 in a register at an offset and retrieves it", () => {
    cpu.setRegisterInt("r6", -100, 4);
    expect(cpu.getRegisterInt("r6", 4)).toEqual(-100);
  });

  it("Stores a Float32 in a register and retrieves it", () => {
    cpu.setRegisterFloat("r7", 3.1415);
    expect(cpu.getRegisterFloat("r7")).toBeCloseTo(3.1415);
  });

  it("Stores a Float32 in a register at an offset and retrieves it", () => {
    cpu.setRegisterFloat("r7", -6.182, 4);
    expect(cpu.getRegisterFloat("r7", 4)).toBeCloseTo(-6.182);
  });

  it("Stores a Float64 in a register and retrieves it", () => {
    cpu.setRegisterFloat("r8", 102.17e-17);
    expect(cpu.getRegisterFloat("r8")).toBeCloseTo(102.17e-17);
  });
});
