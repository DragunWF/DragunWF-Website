import { useEffect } from "react";
import PropTypes from "prop-types";

function ExternalRedirect({ url }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return null;
}

ExternalRedirect.propTypes = { url: PropTypes.string.isRequired };

export default ExternalRedirect;
