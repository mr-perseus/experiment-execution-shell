// @flow
import React from 'react';

const HorizontalCenter = ({
  children,
  offset
}: {
  children: React$Node,
  offset: number
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: `calc(98vw - ${offset}px)`
      }}
    >
      <div style={{ flexGrow: 1 }} />
      <div
        style={{
          flexShrink: 0,
          minWidth: '400px',
          maxWidth: '600px'
        }}
      >
        {children}
      </div>
      <div style={{ flexGrow: 1 }} />
    </div>
  );
};

const VerticalCenter = ({ children }: { children: React$Node }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '98vh'
      }}
    >
      <div style={{ flexGrow: 1 }} />
      <div style={{ flexShrink: 0, textAlign: 'center' }}>{children}</div>
      <div style={{ flexGrow: 1 }} />
    </div>
  );
};

const Center = ({
  children,
  offset = 0
}: {
  children: React$Node,
  offset?: number
}) => {
  return (
    <HorizontalCenter offset={offset}>
      <VerticalCenter> {children}</VerticalCenter>
    </HorizontalCenter>
  );
};

Center.defaultProps = {
  offset: 0
};

export default Center;
