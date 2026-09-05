// useRouteError — returns the error object (status, statusText) thrown by the current route
// useNavigate  — returns a function to programmatically navigate between routes
import { useRouteError, useNavigate } from "react-router";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const is404 = error?.status === 404;

  return (
    <div className="error-page">

      <div className="error-plate">
        <span>🍽️</span>
      </div>

      <div className="error-badge">
        {error?.status || "Error"} — {error?.statusText || "something went wrong"}
      </div>

      <h1 className="error-title">
        {is404
          ? "Looks like this page went missing"
          : "Something went wrong in the kitchen"}
      </h1>

      <p className="error-sub">
        {is404
          ? "The page you're looking for isn't on the menu. It may have moved, or the URL might be off."
          : "We hit an unexpected error. Our team has been notified — try again in a moment."}
      </p>

      <div className="error-btn-row">
        <button className="error-btn-primary" onClick={() => navigate("/")}>
          Go home
        </button>
        <button className="error-btn-ghost" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>

      <div className="error-meta">
        {window.location.pathname}
      </div>

    </div>
  );
};

export default Error;