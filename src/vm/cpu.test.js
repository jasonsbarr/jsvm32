import memory from "./memory.js";
import CPU from "./cpu.js";

const cpu = new CPU(memory(256));

describe("Initializing a CPU object", () => {
  it("Creates a new object", () => {
    expect(typeof cpu).toEqual("object");
  });
});
