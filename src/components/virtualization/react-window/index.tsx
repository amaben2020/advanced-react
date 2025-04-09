import React from 'react';
import { FixedSizeList } from 'react-window';
import { faker } from '@faker-js/faker';
const ReactListComponent = () => {
  const data = Array.from({ length: 10000 }).map(() => ({
    name: faker.name.firstName(),
    email: faker.internet.email(),
  }));
  const Row = ({ index, style }) => {
    const isEvenRow = index % 2 === 0;
    const backgroundColor = isEvenRow ? '#F9A03F' : '#FDDB3A';
    const textColor = isEvenRow ? '#FFFFFF' : '#4A4A4A';
    const rowStyle = {
      ...style,
      backgroundColor,
      color: textColor,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 16px',
    };
    return (
      <div style={rowStyle}>
        <p>{data[index].name}</p>
        <p>{data[index].email}</p>
      </div>
    );
  };
  return (
    <FixedSizeList
      height={600}
      width={1200}
      itemSize={50}
      itemCount={data.length}
    >
      {Row}
    </FixedSizeList>
  );
};
export default ReactListComponent;
