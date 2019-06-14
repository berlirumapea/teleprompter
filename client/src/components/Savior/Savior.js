import React from 'react';
import { Message, TextArea, Button, Header } from 'semantic-ui-react';
import { Picker, Emoji } from 'emoji-mart';
import io from 'socket.io-client';

const socket = io('http://192.168.1.12:9999');

const Savior = () => {
  const [emojiOpen, setEmojiOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  let textAreaRef = React.useRef();

  const autosize = () => {
    if (
      !textAreaRef.current.ref.current.scrollHeight >
      textAreaRef.current.ref.current.style.height
    ) {
      setTimeout(function() {
        textAreaRef.current.ref.current.style.height =
          textAreaRef.current.ref.current.scrollHeight + 'px';
      }, 0);
    }
  };

  const messageOnChange = e => {
    setMessage(e.target.value);
    if (emojiOpen) setEmojiOpen(false);
  };

  const toggleOmoji = () => {
    setEmojiOpen(!emojiOpen);
  };

  const messageOnSubmit = e => {
    e.preventDefault();
    setIsSubmitted(true);
    socket.emit('message', {
      username: localStorage.getItem('username'),
      message,
    });
    setMessage('');

    setTimeout(() => {
      setIsSubmitted(false);
      setMessage('');
    }, 3000);
  };

  const emojiOnClick = emoji => {
    setMessage(message + emoji.native);
  };

  return (
    <div className='savior-container'>
      {isSubmitted && (
        <Message
          info
          header='Message has been sent'
          content='Please wait 5 seconds to send another message'
          className='message-info'
          size='big'
        />
      )}
      <form className='message-container' onSubmit={messageOnSubmit}>
        <TextArea
          ref={textAreaRef}
          type='text'
          placeholder='Type your message here...'
          className='message-input'
          value={message}
          onChange={messageOnChange}
          onKeyDown={autosize}
          disabled={isSubmitted}
          maxLength='140'
        />
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
            <Button content="Send"/>
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
              set='twitter'
              onClick={emojiOnClick}
              sheetSize={16}
            />
          </div>
        )}
      </form>
      <div className="message-history">
        <Header as="h4" content="History" />
        <div className="history-box">
          <ul>
            <li>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium d</p>
              <span>07:00 AM</span>
            </li>
            <li>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium d</p>
              <span>08:00 AM</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Savior;
