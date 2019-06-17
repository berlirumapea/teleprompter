import React from 'react';
import io from 'socket.io-client';
import moment from 'moment';

const socket = io('http://192.168.1.12:9999');

const Prompter = () => {
  const [messages, setMessages] = React.useState([]);

  const [shownMessage, setShownMessage] = React.useState('');
  let messageRef = React.useRef();

  React.useEffect(() => {
    socket.on('messageReceive', async data => {
      let msgs = messages;
      msgs.unshift(data);
      setMessages(msgs);
      if (messages.length === 0) {
        setShownMessage('No message for now');
      } else {
        setTimeout(() => {
          messageRef.current.classList.add('fadeIn');
          setShownMessage(messages[messages.length - 1]);
          msgs.splice(messages.length - 1, 1);
          setMessages(msgs);
        }, 4000 * messages.length);
        if (messages.length > 1) {
          setTimeout(() => {
            messageRef.current.classList.remove('fadeIn');
          }, 3900 * messages.length);
        }
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [messages]);

  return (
    <div className='prompter-container'>
      {shownMessage.username && (
        <div className='sender-name-container'>
          <p>{shownMessage.username}</p>
          <span>{moment(shownMessage.timestamp).fromNow()}</span>
        </div>
      )}
      <h1 ref={messageRef} className='animated'>
        {shownMessage.message}
      </h1>
      {!shownMessage.message && <h1>No Message</h1>}
    </div>
  );
};

export default Prompter;
