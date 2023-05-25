import { useEffect, useState } from 'react';
import '/src/components/Toast/Toast.css';

function Toast({ onSetToast, text }) {
  const [animation, setAnimation] = useState('fade-in');
  useEffect(() => {
    const durationTimer = setTimeout(() => {
      onSetToast(false);
    }, 3000);

    const fadeOutTimer = setTimeout(() => {
      setAnimation('fade-out');
    }, 2000);

    return () => {
      clearTimeout(durationTimer);
      setAnimation(fadeOutTimer);
    };
  }, []);

  return (
    <div className={`toast-wrapper ${animation}`}>
      <p className="toast-text">{text}</p>
    </div>
  );
}

export default Toast;
