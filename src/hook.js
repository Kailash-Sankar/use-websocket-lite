import { useState, useEffect } from 'react';

// json parse a message
// fallback to original message
function formatMessage(data) {
  try {
    const parsed = JSON.parse(data);
    return parsed;
  } catch (err) {
    return data;
  }
}

// returns epoch time
function getTimestamp() {
  return new Date().getTime();
}

// websocket hook
function useWebSocketLite({
  socketUrl,
  protocol,
  retry: defaultRetry = 3,
  retryInterval = 1500
}) {
  // message and timestamp
  const [data, setData] = useState();
  // send function
  const [send, setSend] = useState(() => () => undefined);
  // state of our connection
  const [retry, setRetry] = useState(defaultRetry);
  // retry counter
  const [readyState, setReadyState] = useState(false);

  useEffect(() => {
    const params = [socketUrl];
    if (protocol) {
      params.push(protocol);
    }
    const ws = new WebSocket(...params);

    ws.onopen = () => {
      console.log('Connected to socket');
      setReadyState(true);

      // fn to send messages
      setSend(() => {
        return (data) => {
          try {
            const d = JSON.stringify(data);
            ws.send(d);
            return true;
          } catch (err) {
            return false;
          }
        };
      });

      // reveive messages
      ws.onmessage = (event) => {
        const msg = formatMessage(event.data);
        setData({ message: msg, timestamp: getTimestamp() });
      };
    };

    ws.onclose = () => {
      setReadyState(false);
      // retry logic
      if (retry > 0) {
        setTimeout(() => {
          setRetry((retry) => retry - 1);
        }, retryInterval);
      }
    };
    // terminate connection on unmount
    return () => {
      ws.close();
    };
  }, [retry]);

  return { send, data, readyState };
}

export default useWebSocketLite;
