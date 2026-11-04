const Offline = () => {
  return (
    <section className="offline" role="alert" aria-live="assertive">
      <div className="offline__plate" aria-hidden="true">
        <svg viewBox="0 0 64 64" width="56" height="56" fill="none">
          <path
            d="M6 24c13-12 39-12 52 0M15 33c8-7 26-7 34 0M24 42c4-3.5 12-3.5 16 0"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="32" cy="51" r="3.5" fill="currentColor" />
          <path
            d="M10 8l44 48"
            stroke="#c0392b"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h2 className="offline__title">You're offline</h2>
      <p className="offline__text">
        We can't reach the kitchen right now. Check your Wi-Fi or mobile data,
        then try again.
      </p>

      <button
        className="offline__btn"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </section>
  );
};

export default Offline;
