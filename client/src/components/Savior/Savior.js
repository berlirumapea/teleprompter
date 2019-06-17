import React from 'react';
import { TextArea, Button, Header } from 'semantic-ui-react';
import { Picker, Emoji } from 'emoji-mart';
import io from 'socket.io-client';
import { navigate } from '@reach/router';
import moment from 'moment';

const socket = io('http://192.168.1.12:9999');

const Savior = () => {
  const [emojiOpen, setEmojiOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [presetMessages] = React.useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
  ]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  let textAreaRef = React.useRef();
  let pickerRef = React.useRef();

  React.useEffect(() => {
    if (!localStorage.getItem('username')) {
      navigate('/');
    }
  }, []);

  // const autosize = () => {
  //   if (
  //     !textAreaRef.current.ref.current.scrollHeight >
  //     textAreaRef.current.ref.current.style.height
  //   ) {
  //     setTimeout(function() {
  //       textAreaRef.current.ref.current.style.height =
  //         textAreaRef.current.ref.current.scrollHeight + 'px';
  //     }, 0);
  //   }
  // };

  const messageOnChange = e => {
    setMessage(e.target.value);
    if (emojiOpen) setEmojiOpen(false);
  };

  const messageOnSubmit = e => {
    e.preventDefault();
    // setIsSubmitted(true);
    const msgData = {
      username: localStorage.getItem('username'),
      message,
      timestamp: Date.now(),
    };
    let msgs = messages;
    socket.emit('message', msgData);
    setMessage('');
    msgs.unshift(msgData);
    setMessages(msgs);

    setTimeout(() => {
      setIsSubmitted(false);
      setMessage('');
    }, 3000);
  };

  const emojiOnClick = emoji => {
    setMessage(message + emoji.native);
    textAreaRef.current.focus();
  };

  const presetOnClick = text => {
    textAreaRef.current.focus();
    textAreaRef.current.ref.current.value = message + text + ' ';
    setMessage(message + text + ' ');
  };

  const toggleOmoji = () => {
    setEmojiOpen(!emojiOpen);
  };

  return (
    <div className='savior-container'>
      <form className='message-container' onSubmit={messageOnSubmit}>
        <TextArea
          ref={textAreaRef}
          type='text'
          placeholder='Type your message here...'
          className='message-input'
          value={message}
          onChange={messageOnChange}
          // onKeyDown={autosize}
          disabled={isSubmitted}
          maxLength='140'
          rows='5'
        />
        <div className='preset-messages'>
          {presetMessages.map((pre, i) => (
            <Button
              key={i}
              content={pre}
              className='preset-message'
              onClick={() => presetOnClick(pre)}
              type='button'
            />
          ))}
        </div>
        <div className='message-footer'>
          <div className='left'>
            <p className='chars_left'>{message.length} / 140</p>
            <Emoji
              emoji={{ id: 'slightly_smiling_face', skin: 4 }}
              size={24}
              native={true}
              onClick={toggleOmoji}
            />
          </div>
          <div className='right'>
            <Button content='Send' disabled={!message.length} primary />
          </div>
        </div>
        {emojiOpen && (
          <div className='emoji-picker'>
            <Picker
              set='emojione'
              showPreview={false}
              title=''
              showSkinTones={false}
              emoji=''
              color='#313131'
              onClick={emojiOnClick}
              ref={pickerRef}
              native={true}
              // sheetSize={16}
            />
          </div>
        )}
      </form>
      <div className='message-history'>
        <Header as='h4' content='History' />
        <div className='history-box'>
          <ul>
            {messages.map((msg, id) => (
              <li key={id}>
                <p>{msg.message}</p>
                <span>{moment(msg.timestamp).fromNow()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Savior;
