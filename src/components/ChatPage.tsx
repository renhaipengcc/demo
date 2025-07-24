import React, { useState, useEffect, useRef } from 'react';

// 简单的消息类型定义
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 模拟初始欢迎消息
  useEffect(() => {
    setMessages([
      { id: 1, text: '你好！我是Aime, 有什么可以帮到你？', sender: 'bot' },
    ]);
  }, []);

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // 模拟机器人回复
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: `你刚才说的是: "${input}"`,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                backgroundColor: msg.sender === 'user' ? '#dcf8c6' : '#fff',
                padding: '10px 15px',
                borderRadius: '18px',
                maxWidth: '60%',
                boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div
        style={{
          display: 'flex',
          padding: '10px',
          borderTop: '1px solid #ddd',
          backgroundColor: '#fff',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            marginRight: '10px',
          }}
          placeholder="输入消息..."
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
