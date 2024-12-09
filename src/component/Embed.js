import React, { useEffect } from 'react';

const Embed = () => {
  useEffect(() => {
    const addMessageListener = (callback, customListenerKey) => {
      if (!window.eventListeners) {
        window.eventListeners = {};
      }

      const listenerKey = customListenerKey || iframeId;
      window.eventListeners[listenerKey] = callback;

      // Add a listener for responses
      const messageListener = (event) => {
        let responseListenerKey = event.data.type || event.data.sender;

        if (responseListenerKey && window.eventListeners[responseListenerKey]) {
          window.eventListeners[responseListenerKey](event);
        }
      };

      window.addEventListener('message', messageListener);

      return () => {
        window.removeEventListener('message', messageListener);
      };
    };

    const getParameterByName = (name) => {
      const url = window.location.href;
      const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
      const results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    const log = (message) => {
      if (getParameterByName('s.io_debug')) {
        console.log(message);
      }
    };

    let uid;
    let scriptId;
    let iframeId;

    do {
      uid = new Date().getTime();
      scriptId = `systeme-script-${uid}`;
      iframeId = `systemeio-iframe-${uid}`;
    } while (document.getElementById(scriptId) !== null);

    const iframe = document.createElement('iframe');
    iframe.id = iframeId;
    iframe.style.margin = '0 auto';
    iframe.style.border = 'none';
    iframe.style.visibility = 'hidden';
    iframe.style.overflow = 'hidden';
    iframe.style.position = 'relative';
    iframe.style.left = '50%';
    iframe.style.transform = 'translateX(-50%)';
    iframe.width = '100%';
    iframe.scrolling = 'no';

    // Construct iframe source
    let pageSource = 'https://ibrahimkaizen.systeme.io/public/24212763dd9af8e713ca26011c45e9d40aff52bb/show';
    const affiliateId = getParameterByName('sa');
    if (affiliateId) {
      pageSource += `?sa=${affiliateId}`;
    }

    const preview = getParameterByName('remote-preview');
    if (preview) {
      pageSource += (affiliateId ? '&' : '?') + `preview=${preview}`;
    }

    const email = getParameterByName('email');
    if (email) {
      pageSource += (affiliateId || preview ? '&' : '?') + `email=${email}`;
    }

    const referer = window.location.href.split('#')[0]; // Remove anchors
    pageSource += (affiliateId || preview || email ? '&' : '?') + `source=${referer}`;

    iframe.src = `${pageSource}#${iframeId}`;
    document.querySelector('.eBook').appendChild(iframe);

    addMessageListener((event) => {
      const targetIframe = document.getElementById(event.data.sender);
      if (targetIframe) {
        targetIframe.style.visibility = 'visible';
        targetIframe.style.height = `${event.data.height}px`;
        targetIframe.style.width = `${event.data.width}px`;
      }
    });

    return () => {
    
      document.querySelector('.eBook').removeChild(iframe);
    };
  }, []);

  return null; // The iframe is dynamically appended, no need to render anything
};

export default Embed;
