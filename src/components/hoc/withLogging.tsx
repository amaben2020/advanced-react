import React from 'react';

const withLogging = (Component: React.FC, params) => {
  return (props) => {
    console.log(props);
    const handleLog = () => {
      console.log('Open Telemetry');
      props.onClick();
    };
    // You just need to spread props before your overrides:
    return <Component {...props} onClick={handleLog} title={params.title} />;
  };
};

export default withLogging;
