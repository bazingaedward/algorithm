/**
 * 原理：

使用一个 Map 存储每个请求的时间戳和对应的计数。
每当有请求到来时，计算当前窗口内的请求数，如果超过限制则拒绝。
定期清理过期的计数。
优点： 比简单计数器更灵活，可以统计任意时间窗口内的请求数。

缺点： 内存消耗较大，尤其是窗口大小较长时。数据不持久化。
 */
class SlidingWindowLimiter {
  constructor(windowSize, maxRequests) {
    this.windowSize = windowSize; // 窗口大小（秒）
    this.maxRequests = maxRequests;
    this.window = new Map();
  }

  limit(key) {
    const now = Date.now();
    const windowStart = now - this.windowSize * 1000;

    // 清除过期的计数
    this.window.forEach((count, timestamp) => {
      if (timestamp < windowStart) {
        this.window.delete(timestamp);
      }
    });

    // 获取当前窗口的请求数
    let count = 0;
    this.window.forEach((value) => {
      count += value;
    });

    // 如果当前窗口的请求数超过限制，则拒绝
    if (count >= this.maxRequests) {
      return false;
    }

    // 将当前请求加入窗口
    this.window.set(now, (this.window.get(now) || 0) + 1);
    return true;
  }
}

// 创建一个窗口大小为60秒，每分钟最多允许10个请求的限流器
const limiter = new SlidingWindowLimiter(60, 10);

// 检查请求是否允许
if (limiter.limit('my-resource')) {
  console.log('请求允许');
} else {
  console.log('请求被限制');
}
