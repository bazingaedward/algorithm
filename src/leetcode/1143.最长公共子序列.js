// 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
// 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

// 示例 1：

// 输入：text1 = "abcde", text2 = "ace"
// 输出：3
// 解释：最长公共子序列是 "ace" ，它的长度为 3 。
// 示例 2：

// 输入：text1 = "abc", text2 = "abc"
// 输出：3
// 解释：最长公共子序列是 "abc" ，它的长度为 3 。
// 示例 3：

// 输入：text1 = "abc", text2 = "def"
// 输出：0
// 解释：两个字符串没有公共子序列，返回 0

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length,
    n = text2.length;
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));

  // 初始化dp第一行，第一列
  let included = false;
  for (let i = 0; i < m; i++) {
    if (included) {
      dp[i][0] = 1;
    } else {
      if (text2[0] === text1[i]) {
        dp[i][0] = 1;
        included = true;
      }
    }
  }

  included = false;
  for (let i = 0; i < n; i++) {
    if (included) {
      dp[0][i] = 1;
    } else {
      if (text2[i] === text1[0]) {
        dp[0][i] = 1;
        included = true;
      }
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (text1[i] === text2[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
  }
  return dp[m - 1][n - 1];
};

const text1 = 'abcde',
  text2 = 'ace';
longestCommonSubsequence(text1, text2);
