/**
 * Generic, reusable Shimmer/Skeleton component.
 * Renders different placeholder shapes depending on the "type" prop,
 * so one component covers pills, restaurant cards, and chain cards
 * instead of writing a separate shimmer component for each.
 */
const Shimmer = ({ type = "card", count = 5 }) => {

  // Small helper — generates an array of the given length to loop over
  // (there's no real data yet, so we just need N placeholder blocks)
  const placeholders = Array.from({ length: count });

  if (type === "pill") {
    return (
      <div className="shimmer-pill-row">
        {placeholders.map((_, i) => (
          <div className="shimmer-block shimmer-pill" key={i} />
        ))}
      </div>
    );
  }

  if (type === "chain-card") {
    return (
      <div className="shimmer-card-row">
        {placeholders.map((_, i) => (
          <div className="shimmer-chain-card" key={i}>
            <div className="shimmer-block shimmer-chain-img" />
            <div className="shimmer-block shimmer-line shimmer-line-title" />
            <div className="shimmer-block shimmer-line shimmer-line-sub" />
          </div>
        ))}
      </div>
    );
  }

  // Default: "card" — standard restaurant card shimmer
  return (
    <div className="shimmer-card-row">
      {placeholders.map((_, i) => (
        <div className="shimmer-card" key={i}>
          <div className="shimmer-block shimmer-img" />
          <div className="shimmer-block shimmer-line shimmer-line-title" />
          <div className="shimmer-block shimmer-line shimmer-line-sub" />
          <div className="shimmer-block shimmer-line shimmer-line-short" />
        </div>
      ))}
    </div>
  );
};

export default Shimmer;