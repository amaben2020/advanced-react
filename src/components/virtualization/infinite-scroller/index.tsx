import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

export function generateRandomUser() {
  const names = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Williams',
    'Charlie Brown',
  ];
  const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'example.com'];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomEmail = `${randomName.toLowerCase().replace(' ', '')}@${domains[Math.floor(Math.random() * domains.length)]}`;
  const randomPhone = `+1 (${Math.floor(100 + Math.random() * 900)}) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;

  return { name: randomName, email: randomEmail, phone: randomPhone };
}

function UserList() {
  const [users, setUsers] = useState([]);

  const loadMore = () => {
    const newUsers = Array.from({ length: 20 }, generateRandomUser);
    setUsers((prevUsers) => [...prevUsers, ...newUsers]);
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderBottom: '1px solid #ccc',
    fontSize: '16px',
    color: '#333',
  };

  const nameStyle = { fontWeight: 'bold', color: '#38a3a5' };
  const emailStyle = { fontStyle: 'italic', color: '#ff7f50' };
  const phoneStyle = { color: '#6a5acd' };

  return (
    <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={true}>
      <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
        {users.map((user, index) => (
          <li key={index} style={rowStyle}>
            <div style={nameStyle}>{user.name}</div>
            <div style={emailStyle}>{user.email}</div>
            <div style={phoneStyle}>{user.phone}</div>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
}

export default UserList;
