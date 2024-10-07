/**
 * 原理：

使用一个对象 rateLimiters 存储每个资源的计数器和上次重置时间。
每当有请求到来时，检查该资源的计数器是否超过限制，如果超过则拒绝请求。
每分钟重置一次计数器。
优点： 实现简单，易于理解。

缺点： 只能限制固定时间窗口内的请求数，无法灵活应对突发流量。数据不持久化，重启后会丢失。


 */
const rateLimiters = {}; // 用于存储不同资源的限流信息
function createRateLimiter(maxRequests) {
  return (key) => {
    if (!rateLimiters[key]) {
      rateLimiters[key] = {
        count: 0,
        lastReset: Date.now(),
      };
    }

    const now = Date.now();
    const limiter = rateLimiters[key];

    // 如果距离上次重置时间超过了1分钟，则重置计数器
    if (now - limiter.lastReset > 60 * 1000) {
      limiter.count = 0;
      limiter.lastReset = now;
    }

    if (limiter.count >= maxRequests) {
      return false; // 超过限制
    } else {
      limiter.count++;
      return true;
    }
  };
}

// 创建一个每分钟最多允许10个请求的限流器
const limiter = createRateLimiter(10);

// 检查请求是否允许
setInterval(() => {
  if (limiter('my-resource')) {
    console.log('请求允许');
  } else {
    console.log('请求被限制');
  }
}, 200);
