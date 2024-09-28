// 刷牙 1sec -> 吃早餐 3 sec -> 寫功課 1sec -> 吃午餐 2sec

async function doJob(job, time) {
    let result = await new Promise(function (resolve) {
        setTimeout(() => {
            let now = new Date();
            resolve(`完成工作 ${job} at ${now.toISOString()}`);
        }, time);
    });

    console.log(result);
}

let now = new Date();

console.log(`開始工作 at ${now.toISOString()}`);

await doJob("刷牙", 1000);
await doJob("吃早餐", 3000);
await doJob("寫功課", 1000);
await doJob("吃午餐", 2000);
