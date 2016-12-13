export const compress = json => JSON.stringify(json);

export const decompress = compressedJson => JSON.parse(compressedJson);
