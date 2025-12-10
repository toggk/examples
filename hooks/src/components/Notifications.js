// src/components/Notifications.js
// Component using the specialized notification hook

import { useCartNotifications } from '../hooks/useCart';

const Notifications = () => {
  const { notifications, dismissNotification } = useCartNotifications();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notifications-container">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification">
          <span>{notification.message}</span>
          <button
            onClick={() => dismissNotification(notification.id)}
            className="dismiss-btn"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
