import { useState } from 'react';

function useRedirect() {
  const [redirected, setRedirected] = useState(false);

  function runRedirect(link, newPage = true, internal = false) {
    setRedirected(true);
    setTimeout(() => {
      if (newPage) {
        window.open(link, '_blank', 'noopener,noreferrer');
      }
      else {
        window.location.href = link;
      }

      if (internal == false) {
        setRedirected(false); 
      }

    }, 250);
  }

  return { redirected, runRedirect };
}

export { useRedirect };
