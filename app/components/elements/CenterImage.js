import React from 'react';

export default ({ imagePath }: { imagePath: string }) => {
  const [dimensions, setDimensions] = React.useState(0);
  const ref = React.createRef(null);

  React.useEffect(() => {
    setDimensions(ref.current.clientHeight);
  });

  const height = dimensions ? `${dimensions}px` : '100%';

  return (
    <div
      style={{
        height,
        lineHeight: height,
        width: '100%',
        textAlign: 'center'
      }}
      ref={ref}
    >
      <img
        style={{
          maxHeight: '50%',
          verticalAlign: 'middle'
        }}
        src={imagePath}
        alt="not found"
      />
    </div>
  );
};
