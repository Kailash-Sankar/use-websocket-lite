# use-websocket-lite

> A clean and minimal react hook around client WebSocket

[![NPM](https://img.shields.io/npm/v/use-websocket-lite.svg)](https://www.npmjs.com/package/use-websocket-lite)

## Install

```bash
npm install --save use-websocket-lite
```

## Usage

The hook does only an essential set of tasks, it's kept minimal so that it can be adopted and used easily to learn websockets.

### Params

The hook accepts the following options,

```javascript
const options = {
  // the websocket url (you can pass params here)
  // required
  socketUrl,
  // string or array, passed as sec-websocket-protocol
  // optional, this value is not passed if undefined
  token,
  // number of retry attempts
  // optional, defaults to 3
  retry,
  // retry interval
  // optional, defaults to 1500
  retryInterval
};
```

### Return value

The returned value is an object which contains the following,

```javascript
return {
  // boolean value, indicates if the socket connection is ready or closed
  readyState,

  // function to send data, accepts string or JSON as input
  // JSON value is stringified and sent
  send,

  // the data object contains the received messages and the timestamp associated with it
  // message can be a string or JSON, JSON is parsed by the hook itself
  // { message : <stirng or parsed JSON>, timestamp: <epoch> }
  data
};
```

### Basic usage

A simple use case, connect to socket and receive messages.

```jsx
import React from 'react';
import useWebSocket from 'use-websocket-lite';

function Example() {
  const { data, readyState } = useWebSocket({
    socketUrl: 'ws://localhost:3000'
  });

  return (
    <div>
      <h4>WebSocket Demo</h4>
      <div>
        <strong>Connection State: {readyState ? 'Open' : 'Closed'}</strong>
      </div>
      <div>{data ? data.message : '-'}</div>
    </div>
  );
}
```

### Send and Receive

```jsx
import React, { useState, useEffect, useRef } from 'react';
import useWebSocket from 'use-websocket-lite';
const sockerUrl = 'wss://echo.websocket.org';

const sendTag = (message) => <span>&#11014;: {message}</span>;
const receiveTag = (message) => <span>&#11015;: {message}</span>;

function Example() {
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
          <div>Connection State: {readyState}</div>
        </h6>
        <form>
          <label>Message (string or json)</label>
          <textarea name='message' rows={4} ref={txtRef} />
          <input type='button' onClick={sendData} value='Send' />
        </form>
      </div>
      <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
        {messagesList.map((Tag, i) => (
          <div key={i}>{Tag}</div>
        ))}
      </div>
    </div>
  );
}
```

## License

MIT © [Kailash-Sankar](https://github.com/Kailash-Sankar)
