import { useEffect, useState } from 'react';
import '../styles/Notification.css';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  message: string;
  type: NotificationType;
  duration?: number;
  onClose?: () => void;
}

function Notification({ message, type, duration = 3000, onClose }: NotificationProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        onClose?.();
      }, 300);
      return () => clearTimeout(exitTimer);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification notification-${type} ${isExiting ? 'exit' : ''}`}>
      <div className="notification-content">
        <span className="notification-icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'info' && 'ℹ'}
        </span>
        <span className="notification-message">{message}</span>
      </div>
    </div>
  );
}

export default Notification;
export type { NotificationType };
