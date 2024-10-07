// export class RateLimiter {}

class TokenBucket {
  constructor(capacity, rate, clock = Date.now) {
    this.capacity = capacity; // 桶的容量
    this.rate = rate; // 令牌添加的速率，单位是令牌/秒
    this.tokens = capacity; // 初始令牌数
    this.clock = clock; // 时间函数
    this.lastCheck = clock(); // 上次令牌添加时间
  }

  // 尝试从桶中取出令牌
  tryConsume(tokens = 1) {
    this._addTokens();
    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }

  // 添加令牌到桶中
  _addTokens() {
    const now = this.clock();
    const timeElapsed = now - this.lastCheck;
    const tokensToAdd = Math.floor((timeElapsed * this.rate) / 1000);
    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastCheck = now;
  }

  // 获取当前桶中的令牌数
  getTokens() {
    this._addTokens(); // 确保获取最新的令牌数
    return this.tokens;
  }
}

// 使用示例
const bucket = new TokenBucket(10, 1); // 容量为10，每秒添加5个令牌

// 模拟请求
function simulateRequest(bucket) {
  if (bucket.tryConsume(1)) {
    console.log('Request processed');
  } else {
    console.log('Request rate limited');
  }
}

// 模拟请求发生
setInterval(() => {
  simulateRequest(bucket);
}, 200); // 每200毫秒尝试处理一个请求
