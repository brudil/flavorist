import React from 'react';
import { render } from 'react-dom';
import { ApplicationRoot } from './containers/ApplicationRoot';
import { setupApolloClient } from './config/apollo';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

(async function() {
  const apolloClient = await setupApolloClient();

  render(
    React.createElement(ApplicationRoot, { apolloClient }),
    document.querySelector('.app'),
  );
})();
