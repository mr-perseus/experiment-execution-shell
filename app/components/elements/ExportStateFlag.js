// @flow
import React from 'react';

export default ({ state, success }: { state: string, success: boolean }) => {
  const styling = success ? 'green' : 'red';

  return (
    <div style={{ position: 'relative', width: 0, height: 0 }}>
      <div
        style={{
          position: 'absolute',
          left: '600px',
          width: '100px',
          textAlign: 'center',
          backgroundColor: styling,
          padding: '5px',
          display: state ? '' : 'none',
          borderRadius: '3px'
        }}
      >
        {state}
      </div>
    </div>
  );
};
