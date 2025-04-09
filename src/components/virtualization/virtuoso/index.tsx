import { useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import React from 'react';

const VImage = () => {
  const [images, setImages] = React.useState([]);
  // Fetch random images from Unsplash on component mount
  React.useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(
        'https://api.unsplash.com/photos/random?count=100',
        {
          headers: {
            Authorization:
              'Client-ID vCRa8wxs48KESXSylxE84-WoUzK6l8YwpKCdVVfLiBI',
          },
        }
      );
      const data = await response.json();
      const urls = data.map((item) => item.urls.thumb);
      setImages(urls);
    };
    fetchImages();
  }, []);
  return (
    <Virtuoso
      style={{
        height: '400px',
        background: '#f8f8f8',
      }}
      totalCount={10000}
      itemContent={(index) => (
        <div
          style={{
            background: index % 2 === 0 ? '#ffbb00' : '#ffcc33',
            color: '#333',
            padding: '10px',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            border: '1px solid #ccc',
            borderRadius: '4px',
            margin: '5px 0',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={images[index % 100]}
            alt={`Item ${index}`}
            style={{
              marginRight: '10px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
            }}
          />
          Item {index}
        </div>
      )}
    />
  );
};

export function VirtuosoComponent() {
  const users = useMemo(() => {
    return Array.from({ length: 100000 }, (_, index) => ({
      name: `User ${index}`,
      bgColor: `hsl(${Math.random() * 360}, 70%, 80%)`,
      size: Math.floor(Math.random() * 40) + 100,
      description: `Description for user ${index}`,
    }));
  }, []);

  return (
    <>
      <Virtuoso
        style={{ height: 400 }}
        totalCount={users.length}
        itemContent={(index) => {
          const user = users[index];
          return (
            <div
              style={{
                backgroundColor: user.bgColor,
                padding: '0.5rem',
                height: `${user.size}px`,
              }}
            >
              <p>
                <strong>{user.name}</strong>
              </p>
              <div>{user.description}</div>
            </div>
          );
        }}
      />
      <VImage />
    </>
  );
}
