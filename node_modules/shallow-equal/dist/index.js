function shallowEqualArrays(arrA, arrB) {
  if (arrA === arrB) {
    return true;
  }
  if (!arrA || !arrB) {
    return false;
  }
  var len = arrA.length;
  if (arrB.length !== len) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }
  return true;
}

function shallowEqualObjects(objA, objB) {
  if (objA === objB) {
    return true;
  }
  if (!objA || !objB) {
    return false;
  }
  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);
  var len = aKeys.length;
  if (bKeys.length !== len) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    var key = aKeys[i];
    if (objA[key] !== objB[key] || !Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }
  }
  return true;
}

function shallowEqual(a, b) {
  var aIsArr = Array.isArray(a);
  var bIsArr = Array.isArray(b);
  if (aIsArr !== bIsArr) {
    return false;
  }
  if (aIsArr && bIsArr) {
    return shallowEqualArrays(a, b);
  }
  return shallowEqualObjects(a, b);
}

exports.shallowEqual = shallowEqual;
exports.shallowEqualArrays = shallowEqualArrays;
exports.shallowEqualObjects = shallowEqualObjects;
//# sourceMappingURL=index.js.map
