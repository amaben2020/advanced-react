import React, { useState } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const handleMessageInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    setMessages((prev) => [...prev, userInput]);
  };

  // TODO: update chat with api /chat and set in state

  return (
    <div
      style={{
        background: 'red',
      }}
    >
      {messages.map((msg) => {
        return (
          <>
            {msg.role === 'user' && <>user </>}

            {msg}
          </>
        );
      })}

      <input
        type="text"
        placeholder="Enter chat"
        onChange={handleMessageInput}
      />
      <button onClick={handleClick}>Click</button>
      {userInput}
    </div>
  );
};

export default Messages;
