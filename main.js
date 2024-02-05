document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const gridSize = 30;
    const cellSize = 30;
    const snakeSpeed = 200; // мілісекунди

    let snake = [{ x: 10, y: 10 }];
    let food = generateFood();
    let direction = 'right';

    function drawBoard() {
        board.innerHTML = '';
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (isSnakeCell(x, y)) {
                    cell.classList.add('snake');
                } else if (isFoodCell(x, y)) {
                    cell.classList.add('food');
                }
                board.appendChild(cell);
            }
        }
    }

    function isSnakeCell(x, y) {
        return snake.some(segment => segment.x === x && segment.y === y);
    }

    function isFoodCell(x, y) {
        return food.x === x && food.y === y;
    }

    function generateFood() {
        return {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
        };
    }

    function moveSnake() {
        const head = Object.assign({}, snake[0]); // створюємо копію голови
        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            food = generateFood();
        } else {
            snake.pop(); // видаляємо останній сегмент
        }
    }

    function checkCollision() {
        const head = snake[0];
        if (
            head.x < 0 ||
            head.x >= gridSize ||
            head.y < 0 ||
            head.y >= gridSize ||
            isSnakeCollision()
        ) {
            clearInterval(gameInterval);
            alert('Гра закінчена! Очки: ' + (snake.length - 1));
        }
    }

    function isSnakeCollision() {
        const head = snake[0];
        return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }

    document.addEventListener('keydown', handleKeyPress);

    function gameLoop() {
        moveSnake();
        checkCollision();
        drawBoard();
    }

    const gameInterval = setInterval(gameLoop, snakeSpeed);
});
