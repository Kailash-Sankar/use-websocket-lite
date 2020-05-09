import './styles/milligram.css';
import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function Home() {
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='column column-80 column-offset-10 ta-center'>
            <h3 style={{ marginBottom: '0.5rem' }}>use-web-socket</h3>
            <h5>A clean and minimal react hook around client WebSocket</h5>
          </div>
        </div>
        <div className='row'>
          <div className='column column-80 column-offset-10 app'>
            <App />
          </div>
        </div>
        <div className='row'>
          <div className='column column-100'>
            <div className='footer ta-center'>
              <a href='https://github.com/Kailash-Sankar/use-web-socket'>
                Kailash Sankar, April 2020
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Home />, document.getElementById('root'));
