// Q1: sum all elements in ary

// Way 1: forEach

let sumA = (arr) => {
    let sum = 0;
    arr.forEach(num => {
        sum += num
    });
    return sum;
}

// Way 2: reduce

let sumB = (arr) => {
    return arr.reduce((sum, current) => sum + current);
}

let sample = [0, 1, 2, 3, 4, 5];

console.log("Q1-Way 1:", sumA(sample));
console.log("Q1-Way 2:", sumB(sample));


// Q2: 如果 sum 函式的 input 是 n，要回傳 1 + 2 + 3 + … + n

// Way 1: 公式解

let sumC = (n) => {
    return (1 + n) * n / 2;
}


// Way 2: generate 1 to n array(idea from stack overflow), and then sum the array

let sumD = (n) => {
    let numArr = Array.from(Array(n+1).keys())
    return numArr.reduce((sum, current) => sum + current);
}


console.log("\nQ2-Way 1:", sumC(5));
console.log("Q2-Way 2:", sumD(5));