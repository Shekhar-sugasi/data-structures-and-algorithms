let array = [105, 79, 100, 110];

function merge(leftHalf, rightHalf) {
  let sortedArray = [];

  while (leftHalf.length && rightHalf.length) {
    if (leftHalf[0] < rightHalf[0]) {
      sortedArray.push(leftHalf.shift());
    } else {
      sortedArray.push(rightHalf.shift());
    }
  }
  return [...sortedArray, ...leftHalf, ...rightHalf];
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const leftHalf = mergeSort(array.slice(0, mid));
  const rightHalf = mergeSort(array.slice(mid));
  return merge(leftHalf, rightHalf);
}

console.log(mergeSort(array));
