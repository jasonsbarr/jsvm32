import memory from "./src/vm/memory.js";
import CPU from "./src/vm/cpu.js";
import instructions from "./src/instructions.js";
import types from "./src/vm/types.js";

const mem = memory(256);
const cpu = new CPU(mem);
let bytes = new Uint8Array(mem.buffer);

// const IP = 0;
const ACC = 1;
const R1 = 2;
const R2 = 3;
const R3 = 4;

let i = 0;
cpu.debug();

bytes[i++] = instructions.MOV_LIT_REG.opcode;
bytes[i++] = types.uword.code;
bytes[i++] = 0x12;
bytes[i++] = 0x34;
bytes[i++] = R1;

cpu.step();
cpu.debug();

bytes[i++] = instructions.MOV_REG_REG.opcode;
bytes[i++] = types.uword.code;
bytes[i++] = R1;
bytes[i++] = R2;

cpu.step();
cpu.debug();

bytes[i++] = instructions.ADD_REG_REG.opcode;
bytes[i++] = types.uword.code;
bytes[i++] = R1;
bytes[i++] = R2;

cpu.step();
cpu.debug();

bytes[i++] = instructions.MOV_REG_MEM.opcode;
bytes[i++] = types.uword.code;
bytes[i++] = ACC;
bytes[i++] = 0x00;
bytes[i++] = 0x00;
bytes[i++] = 0x00;
bytes[i++] = 0x64;

cpu.step();
cpu.viewMemoryAt(100);
cpu.debug();

bytes[i++] = instructions.MOV_MEM_REG.opcode;
bytes[i++] = types.uword.code;
bytes[i++] = 0x00;
bytes[i++] = 0x00;
bytes[i++] = 0x00;
bytes[i++] = 0x64;
bytes[i++] = R3;

cpu.step();
cpu.debug();
