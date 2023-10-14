let _encodeBase64 = (text) => {
    throw new Error("Not implemented");
};
let _decodeBase64 = (text) => {
    throw new Error("Not implemented");
};
let _encodeBytesToBase64 = (bytes) => {
    return btoa(String.fromCharCode(...bytes));
};
export const encodeBase64Impl = (impl) => {
    _encodeBase64 = impl;
};
export const decodeBase64Impl = (impl) => {
    _decodeBase64 = impl;
};
export const encodeBytesToBase64Impl = (impl) => {
    _encodeBytesToBase64 = impl;
};
export const encodeBase64 = (text) => {
    return _encodeBase64(text);
};
export const decodeBase64 = (text) => {
    return _decodeBase64(text);
};
export const encodeBytesToBase64 = (bytes) => {
    return _encodeBytesToBase64(bytes);
};
//# sourceMappingURL=base64.js.map