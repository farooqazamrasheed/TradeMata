// withAdminRoute.js
import { useSelector } from 'react-redux';

const withAdminRoute = (WrappedComponent) => {
  return (props) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isAdmin = useSelector((state) => state.user.isAdmin);
// Example debugging in withAdminRoute
console.log('isLoggedIn:', isLoggedIn);
console.log('isAdmin:', isAdmin);

    // Check if the user is not logged in or not an admin
    if (!(isLoggedIn && isAdmin)) {
      // Redirect on the server side using Next.js context
      if (typeof window === 'undefined') {
        // This block runs only on the server side
        const { res } = props.ctx || {}; // Access to Next.js context
        if (res) {
          res.writeHead(302, { Location: '/' });
          res.end();
        }
        return null; // Return null to prevent rendering on the server side
      }
      // If on the client side, return null or loading state if you prefer
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminRoute;
