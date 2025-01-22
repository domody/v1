import React from 'react';

const IconButton = ({ link, children }) => {
  return (
    <a
      className="flex cursor-pointer items-center justify-center transition-all hover:scale-110"
      href={link}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      {children}
    </a>
  );
};

export { IconButton };
