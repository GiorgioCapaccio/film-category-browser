import React from 'react';
import './Loading.scss';

interface LoadingProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

const Loading: React.FC<LoadingProps> = ({ 
  text = 'Loading...', 
  size = 'medium' 
}) => {
  return (
    <div className={`loading ${size !== 'medium' ? `loading--${size}` : ''}`}>
      <div className="loading-spinner"></div>
      {text && <p>{text}</p>}
    </div>
  );
};

export default Loading;