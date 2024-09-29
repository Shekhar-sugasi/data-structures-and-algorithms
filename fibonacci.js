let num = 5;

// Iterative fibonacci series
let n1 = 0,
  n2 = 1,
  nxtTerm;
for (let i = 0; i <= num; i++) {
  console.log(n1);
  nxtTerm = n1 + n2;
  n1 = n2;
  n2 = nxtTerm;
}

// Recursive fibonacci series
function recursiveFibonacci(num) {
  if (num < 2) {
    return num;
  } else {
    return recursiveFibonacci(num - 1) + recursiveFibonacci(num - 2);
  }
}

function printFibonacciSeries(num) {
  for (let i = 0; i <= num; i++) {
    console.log(recursiveFibonacci(i));
  }
}

printFibonacciSeries(num);
