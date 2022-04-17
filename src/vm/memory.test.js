import memory from "./memory.js";

test("Memory function returns a DataView object", () => {
  expect(memory(256)).toEqual(new DataView(new ArrayBuffer(256)));
});
