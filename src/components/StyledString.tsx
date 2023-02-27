import React from 'react';

interface Props {
  str: string;
  indexArr: number[];
}

const StyledString: React.FC<Props> = ({ str, indexArr }) => {
  const style: React.CSSProperties = {
    color: '#E1316D',
  };

  const styledChars = str.split('').map((char, index) => {
    const isStyled = indexArr.includes(index);

    return (
      <span key={index} style={isStyled ? style : { fontWeight: 100 }}>
        {char}
      </span>
    );
  });

  return <span>{styledChars}</span>;
};

export default StyledString;
