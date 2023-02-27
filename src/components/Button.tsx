import React from 'react';

type Props = {
  svg: React.ReactNode;
  text: String;
};

export default function Button({ svg, text }: Props) {
  return (
    <div className='btn'>
      <i>{svg}</i>
      <span>{text}</span>
    </div>
  );
}
