import React, { useState, useEffect, useCallback } from 'react';

const gridSize = 20;

const SnakeGame = () => {
    const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
    const [food, setFood] = useState({ x: 10, y: 10 });
    const [dir, setDir] = useState('RIGHT');
    const [isOver, setIsOver] = useState(false);

    const moveSnake = useCallback(() => {
        let newSnake = [...snake];
        let head = { ...newSnake[0] };

        switch (dir) {
            case 'RIGHT':
                head.x += 1;
                break;
            case 'LEFT':
                head.x -= 1;
                break;
            case 'UP':
                head.y -= 1;
                break;
            case 'DOWN':
                head.y += 1;
                break;
            default:
                break;
        }

        newSnake.unshift(head);
        if (head.x !== food.x || head.y !== food.y) {
            // If not eating, remove tail
            newSnake.pop();
        } else {
            // Respawn food
            setFood({ x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) });
        }

        // Check for collisions
        for (let i = 1; i < newSnake.length; i++) {
            if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                setIsOver(true);
                return;
            }
        }

        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
            setIsOver(true);
            return;
        }

        setSnake(newSnake);
    }, [dir, snake, food]);

    useEffect(() => {
        if (!isOver) {
            const gameInterval = setInterval(moveSnake, 150);
            return () => clearInterval(gameInterval);
        }
    }, [moveSnake, isOver]);

    useEffect(() => {
        const handleArrowKeys = (e) => {
            switch (e.key) {
                case 'ArrowRight':
                    if (dir !== 'LEFT') setDir('RIGHT');
                    break;
                case 'ArrowLeft':
                    if (dir !== 'RIGHT') setDir('LEFT');
                    break;
                case 'ArrowUp':
                    if (dir !== 'DOWN') setDir('UP');
                    break;
                case 'ArrowDown':
                    if (dir !== 'UP') setDir('DOWN');
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleArrowKeys);
        return () => document.removeEventListener('keydown', handleArrowKeys);
    }, [dir]);

    return (
        <div>
            {isOver ? (
                <div>Game Over!</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 20px)` }}>
                    {Array.from({ length: gridSize * gridSize }).map((_, index) => {
                        const x = index % gridSize;
                        const y = Math.floor(index / gridSize);
                        const isSnakeSegment = snake.some(seg => seg.x === x && seg.y === y);
                        const isFood = food.x === x && food.y === y;

                        return (
                            <div
                                key={index}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: isSnakeSegment ? 'green' : isFood ? 'red' : 'white',
                                    border: '1px solid lightgray',
                                }}
                            ></div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SnakeGame;
