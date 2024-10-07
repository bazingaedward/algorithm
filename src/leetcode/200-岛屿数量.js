/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let res = 0;
  const m = grid.length,
    n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        res++;
        bfs(grid, i, j, m, n);
      }
    }
  }

  return res;
};

/**
快速将以i,j为起点的岛屿范围全部遍历后退出，将原本1的数值改为0
 */
const bfs = (grid, i, j, m, n) => {
  grid[i][j] = '0';
  // 从上下左右4个方向检索,确定好边界case
  if (i - 1 >= 0 && grid[i - 1][j] === '1') {
    bfs(grid, i - 1, j, m, n);
  }

  if (i + 1 < m && grid[i + 1][j] === '1') {
    bfs(grid, i + 1, j, m, n);
  }

  if (j - 1 >= 0 && grid[i][j - 1] === '1') {
    bfs(grid, i, j - 1, m, n);
  }

  if (j + 1 < n && grid[i][j + 1] === '1') {
    bfs(grid, i, j + 1, m, n);
  }
};
