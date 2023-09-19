import React from 'react';
import SnakeGame from './SnakeGame';

function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>Snake Game with React</h1>
            <SnakeGame />
        </div>
    );
}

export default App;
