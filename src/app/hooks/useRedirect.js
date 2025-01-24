import { useState } from 'react';

function useRedirect() {
  const [redirected, setRedirected] = useState(false);

  function runRedirect(link, internal = false) {
    setRedirected(true);
    setTimeout(() => {
      if (!internal) {
        window.open(link, '_blank', 'noopener,noreferrer');
        setRedirected(false);
      } else {
        window.location.href = link;
      }
    }, 250);
  }

  return { redirected, runRedirect };
}

export { useRedirect };
