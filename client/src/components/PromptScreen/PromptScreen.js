import React from 'react';
import io from 'socket.io-client';
import { Header } from 'semantic-ui-react';

const socket = io('http://192.168.1.12:9999');

const Prompter = () => {
  const [messages, setMessages] = React.useState([]);

  const [shownMessage, setShownMessage] = React.useState('');
  const setMsg = (msg, ms) =>
    new Promise(resolve =>
      setTimeout(() => {
        setShownMessage(msg);
        resolve();
      }, ms)
    );

  React.useEffect(() => {
    socket.on('messageReceive', async data => {
      let msgs = messages;
      msgs.unshift(data.message);
      setMessages(msgs);
      console.log('first', messages);

      if (messages.length === 0) {
        setShownMessage('No message for now');
      } else {
        let showMessageIntv = setTimeout(() => {
          setShownMessage(messages[messages.length - 1]);
          msgs.splice(messages.length - 1, 1);
          setMessages(msgs);
          console.log('second', messages);
        }, 3000 * messages.length - 1);
      }

      // let timeout = 0;
      // if (msgs.length > 1) {
      //   timeout = 3000;
      // }
      // await setMsg(messages[i], timeout);
    });
  }, [messages]);

  React.useEffect(() => {}, [messages]);

  return (
    <div className='prompter-container'>
      <Header as='h3' id='sender-name' content='Admin' />
      <h1>{shownMessage}</h1>
      {/* <div className='message'>
        <div className='shownMassage'>
          <p>{shownMessage}</p>
        </div>
      </div> */}
    </div>
  );
};

export default Prompter;
