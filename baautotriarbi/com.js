// 创建一个包含多个 Promise 的数组
console.log('2222')
const promises = [];
for (let i = 0; i < 5; i++) {
  // 创建并存储 Promise
  promises.push(new Promise((resolve, reject) => {
    // 异步操作，例如异步请求
    console.log('before tmout');
    setTimeout(() => {
      console.log(`Promise ${i} resolved`);
      resolve();
    }, 2 * 1000);
     console.log('after tmout');
  }));
}
console.log('push promise');

// 使用 Promise.all() 并行执行所有 Promise
Promise.all(promises)
  .then(() => {
    // 在所有 Promise 都解析后执行的操作
    console.log('All promises resolved');
  })
  .catch((error) => {
    // 处理任何 Promise 的拒绝（reject）
    console.error('Error:', error);
  });
