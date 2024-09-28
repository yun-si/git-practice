let fibonacci = (n) => {
    let arr = [0, 1];
    if (n == 0 || n == 1) {
        return arr[n];
    }

    for (let i = 0; i < n - 2; i++) {
        [arr[0], arr[1]] = [arr[1], arr[0] + arr[1]];
    }

    return arr[0] + arr[1];
};

// 印出前 10 個結果

let answer = [];
for (let j = 0; j < 10; j++) {
    answer.push(fibonacci(j));
}

console.log(answer);

// another way

let fibonacci1 = (n) => {
    let arr = [];
    arr[0] = 0;
    arr[1] = 1;
    for (let i = 2; i <= n; i++) {
        arr[n] = arr[n - 1] + arr[n - 2];
    }
    return arr[n];
};

let answer1 = [];
for (let j = 0; j < 10; j++) {
    answer1.push(fibonacci(j));
}

console.log(answer1);
