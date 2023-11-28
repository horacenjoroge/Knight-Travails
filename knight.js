function knightMoves(start, end) {
    const moves = [
        [-2, -1], [-1, -2],
        [-2, 1], [-1, 2],
        [1, -2], [2, -1],
        [1, 2], [2, 1]
    ];

    function isValid(x, y) {
        return x >= 0 && y >= 0 && x < 8 && y < 8;
    }

    function getValidMoves([x, y]) {
        return moves
            .map(([dx, dy]) => [x + dx, y + dy])
            .filter(([nx, ny]) => isValid(nx, ny));
    }

    const visited = new Set();
    const queue = [[...start, [start]]];

    while (queue.length > 0) {
        const [x, y, path] = queue.shift();
        const currentPosition = [x, y];

        if (x === end[0] && y === end[1]) {
            // We reached the destination
            console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
            path.forEach(position => console.log(position));
            return path;
        }

        visited.add(`${x},${y}`);

        const nextMoves = getValidMoves(currentPosition);

        for (const [nx, ny] of nextMoves) {
            const newPosition = [nx, ny];
            const positionKey = `${nx},${ny}`;

            if (!visited.has(positionKey)) {
                queue.push([nx, ny, [...path, newPosition]]);
                visited.add(positionKey);
            }
        }
    }

    console.log("No path found.");
    return []; // No path found
}

// Example usage
const start = [0, 0];
const end = [1, 2];
knightMoves(start, end);
