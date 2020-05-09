import React, { useState, useEffect, useRef } from 'react';
import useWebSocket from 'use-web-socket';

const sockerUrl = 'wss://echo.websocket.org';
//const sockerUrl = 'ws://localhost:3080/?type=ngo_notification';

const sendTag = (message) => <span>&#11014;: {message}</span>;
const receiveTag = (message) => <span>&#11015;: {message}</span>;

function App() {
  const [messagesList, setMessagesList] = useState([
    <span>Messages will be displayed here</span>
  ]);
  const txtRef = useRef();

  const ws = useWebSocket({
    socketUrl: sockerUrl
  });

  useEffect(() => {
    if (ws.data) {
      const { message } = ws.data;
      setMessagesList((messagesList) =>
        [].concat(receiveTag(message), messagesList)
      );
    }
  }, [ws.data]);

  const sendData = () => {
    const message = txtRef.current.value || '';
    if (message) {
      setMessagesList((messagesList) =>
        [].concat(sendTag(message), messagesList)
      );
      ws.send(message);
    }
  };

  const readyState = ws.readyState ? 'Open' : 'Closed';

  return (
    <div>
      <div>
        <h6>
          <div>Socket Url: wss://echo.websocket.org</div>
          <div>
            Connection State:{' '}
            <span className={'connection ' + readyState.toLowerCase()}>
              {readyState}
            </span>
          </div>
        </h6>
        <form>
          <label>Message (string or json)</label>
          <textarea name='message' rows={4} ref={txtRef} />
          <input type='button' onClick={sendData} value='Send' />
        </form>
      </div>
      <div style={{ height: 300, overflowY: 'scroll' }}>
        {messagesList.map((Tag, i) => (
          <div key={i}>{Tag}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
