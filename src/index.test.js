import useWebSocketLite from '.';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const ws = useWebSocketLite({ socketUrl: 'wss://echo.websocket.org' });
  return (
    <div>
      <span test-id='readystate'>{ws.readyState}</span>
    </div>
  );
};

describe('Hook tests', () => {
  it('is truthy', () => {
    expect(<App />).toBeTruthy();
  });

  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
