import useOnlineStatus from "../utils/useOnlineStatus"; // adjust path to your hook

// Small pill for the nav bar. Renders nothing while online.
export const OfflineBadge = () => {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <span className="offline-badge" role="status">
      <span className="offline-badge__dot" aria-hidden="true" />
      Offline
    </span>
  );
};

// Thin strip shown right under the header. Renders nothing while online.
export const OfflineBanner = () => {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div className="offline-banner" role="alert">
      You're offline. Check your connection, some features may not work.
    </div>
  );
};
