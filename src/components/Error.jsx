// useRouteError — React Router hook that returns the error thrown during routing
// gives access to error.status (404, 500) and error.statusText or error.message
// used inside errorElement components to display meaningful error details to the user
import { useRouteError } from "react-router";

const Error = () => {
    const err = useRouteError();
    console.log(err);

    return (
        <div>
            <h1>Oops !!!</h1>
            <h2>Something went wrong !!</h2>
            <h3>{err.status}: {err.statusText}</h3>
        </div>
    );
};

export default Error;