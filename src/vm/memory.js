/**
 * Creates an array of memory for the VM
 * @param {Number} bytes Integer number of bytes to provide the VM
 * @returns {DataView}
 */
export const createMemory = (bytes) => {
  const buffer = new ArrayBuffer(bytes);
  return new DataView(buffer);
};
