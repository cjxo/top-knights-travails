function generatePathBFS(from, to) {
    let matrix = new Array(64).fill({ coord: null, distFromSource: 9999, predecessor: null });

    matrix[from[1] * 8 + from[0]] = {
        coord: from,
        distFromSource: 0,
        predecessor: null
    };
    let queue = [matrix[from[1] * 8 + from[0]]];
    while (queue.length > 0) {
        const dequeuedMove = queue[0];
        queue.splice(0, 1);

        if ((dequeuedMove.coord[0] === to[0]) && (dequeuedMove.coord[1] === to[1])) {
            // guaranteed to return here, under the assumtion from and to are valid moves.
            return dequeuedMove;
        }

        [
            [dequeuedMove.coord[0] - 1, dequeuedMove.coord[1] - 2], // two steps up, one step left
            [dequeuedMove.coord[0] + 1, dequeuedMove.coord[1] - 2], // two steps up, one step right 
            [dequeuedMove.coord[0] - 2, dequeuedMove.coord[1] - 1], // one step up, two steps left
            [dequeuedMove.coord[0] + 2, dequeuedMove.coord[1] - 1], // one step up, two steps right

            [dequeuedMove.coord[0] - 1, dequeuedMove.coord[1] + 2], // two steps down, one step left
            [dequeuedMove.coord[0] + 1, dequeuedMove.coord[1] + 2], // two steps down, one step right
            [dequeuedMove.coord[0] - 2, dequeuedMove.coord[1] + 1], // one step down, two steps left
            [dequeuedMove.coord[0] + 2, dequeuedMove.coord[1] + 1], // one step down, two steps right
        ]
        .forEach(move => {
            const validMove = (move[0] >= 0) && (move[1] >= 0) && (move[0] < 8) && (move[1] < 8);
            if (validMove) {
                const undiscovered = matrix[move[1] * 8 + move[0]].distFromSource === 9999;
                if (undiscovered) {
                    matrix[move[1] * 8 + move[0]] = {
                        coord: move,
                        distFromSource: dequeuedMove.distFromSource + 1,
                        predecessor: dequeuedMove,
                    }
                    queue.push(matrix[move[1] * 8 + move[0]]);
                }
            }
        });
    }
}

// DFS does not guarantee shortest path, but BFS does.
function generatePathDFS(from, to) {
    let matrix = new Array(64).fill({ coord: null, distFromSource: 9999, predecessor: null });
    
    matrix[from[1] * 8 + from[0]] = {
        coord: from,
        distFromSource: 0,
        predecessor: null
    };
    let dfsStack = [matrix[from[1] * 8 + from[0]]];

    while (dfsStack.length > 0) {
        let topOfStack = dfsStack[dfsStack.length - 1];

        if ((topOfStack.coord[0] === to[0]) && (topOfStack.coord[1] === to[1])) {
            return topOfStack;
        }
        let pushedToStack = false;
        [
            [topOfStack.coord[0] - 1, topOfStack.coord[1] - 2], // two steps up, one step left
            [topOfStack.coord[0] + 1, topOfStack.coord[1] - 2], // two steps up, one step right 
            [topOfStack.coord[0] - 2, topOfStack.coord[1] - 1], // one step up, two steps left
            [topOfStack.coord[0] + 2, topOfStack.coord[1] - 1], // one step up, two steps right

            [topOfStack.coord[0] - 1, topOfStack.coord[1] + 2], // two steps down, one step left
            [topOfStack.coord[0] + 1, topOfStack.coord[1] + 2], // two steps down, one step right
            [topOfStack.coord[0] - 2, topOfStack.coord[1] + 1], // one step down, two steps left
            [topOfStack.coord[0] + 2, topOfStack.coord[1] + 1], // one step down, two steps right
        ]
        .forEach(move => {
            const validMove = (move[0] >= 0) && (move[1] >= 0) && (move[0] < 8) && (move[1] < 8);
            if (validMove) {
                const undiscovered = matrix[move[1] * 8 + move[0]].distFromSource === 9999;
                if (undiscovered) {
                    matrix[move[1] * 8 + move[0]] = {
                        coord: move,
                        distFromSource: topOfStack.distFromSource + 1,
                        predecessor: topOfStack,
                    }

                    dfsStack.push(matrix[move[1] * 8 + move[0]]);
                    pushedToStack = true;
                }
            }
        });

        if (!pushedToStack) {
            dfsStack.pop();
        }
    }
}

function knightMovesBFS(from, to) {
    let pathsArray = [];
    let path = generatePathBFS(from, to);

    console.log("---BFS---");
    console.log(`You made it in ${path.distFromSource} moves!`);
    while (path) {
        pathsArray.push(path.coord);
        path = path.predecessor;
    }

    pathsArray
        .reverse()
        .forEach(move => {
            console.log(move);
        })
}

function knightMovesDFS(from, to) {
    let pathsArray = [];
    let path = generatePathDFS(from, to);

    console.log("---DFS---");
    console.log(`You made it in ${path.distFromSource} moves!`);
    while (path) {
        pathsArray.push(path.coord);
        path = path.predecessor;
    }

    pathsArray
        .reverse()
        .forEach(move => {
            console.log(move);
        })
}

// DFS does not guarantee shortest path, but BFS does.
console.log("1. Knight Moves ([3, 3], [0, 0]): ")
knightMovesBFS([3, 3], [0, 0])
//knightMovesDFS([3, 3], [0, 0])

console.log("\n2. Knight Moves ([0, 0], [3, 3]): ")
knightMovesBFS([0, 0], [3, 3])
//knightMovesDFS([0, 0], [3, 3])

console.log("\n3. Knight Moves ([0, 0], [7, 7]): ")
knightMovesBFS([0, 0], [7, 7])
//knightMovesDFS([0, 0], [7, 7])

console.log("\n4. Knight Moves ([3, 3], [4, 3]): ")
knightMovesBFS([3, 3], [4, 3])
//knightMovesDFS([3, 3], [4, 3])
