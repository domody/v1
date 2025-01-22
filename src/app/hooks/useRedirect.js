import { useState } from 'react';

function useRedirect() {
  const [redirected, setRedirected] = useState(false);

  function runRedirect(link, newPage = true) {
    setRedirected(true);
    setTimeout(() => {
      if (newPage) {
        window.open(link, '_blank', 'noopener,noreferrer');
      }
      else {
        window.location.href = link;
      }
      // setRedirected(false); // Reset after redirection if needed
    }, 250);
  }

  return { redirected, runRedirect };
}

export { useRedirect };
