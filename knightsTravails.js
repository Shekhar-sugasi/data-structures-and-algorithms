const kNIGHT_MOVES = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

function isValidMove(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function knightMoves(start, end) {
  const queue = [];
  const visited = new Set();

  queue.push([start, [start]]);
  visited.add(start.toString());

  while (queue.length > 0) {
    const [currentPos, path] = queue.shift();

    if (currentPos[0] === end[0] && currentPos[1] === end[1]) {
      console.log(`Congratulations, You made it in ${path.length - 1} moves!`);
      return path;
    }

    for (const [dx, dy] of kNIGHT_MOVES) {
      const newX = currentPos[0] + dx;
      const newY = currentPos[1] + dy;
      const newPos = [newX, newY];

      if (isValidMove(newX, newY) && !visited.has(newPos.toString())) {
        visited.add(newPos.toString());
        queue.push([newPos, [...path, newPos]]);
      }
    }
  }
}

const start = [0, 0];
const end = [7, 7];
const path = knightMoves(start, end);
path.forEach((step) => console.log(step));
