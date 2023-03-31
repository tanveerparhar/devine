import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log("Error APgeeeee",error,"fasfsd");

  //return (
    
      if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
          return <div>This page doesn't exst!</div>;
        }
    
        if (error.status === 401) {
          return <div>You aren't authorized to see this</div>;
        }
    
        if (error.status === 503) {
          return <div>Looks like our API is down</div>;
        }
    
        if (error.status === 418) {
          return <div>🫖</div>;
        }

        if (error.status === 400) {
          return <div>
           Error 400
          </div>;
        }
      }
    
      return <div>Something went wrong</div>;
    // <div id="error-page">
    //   <h1>Oops!</h1>
    //   <p>Sorry, an unexpected error has occurred.</p>
    //   <p>
    //     <i>{error.statusText || error.message}</i>
    //   </p>
    // </div>
  //);
}