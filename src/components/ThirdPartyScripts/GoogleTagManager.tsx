import React from 'react'

const useSnippet = () => `document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initGTM, 7000);
});
document.addEventListener('scroll', initGTMOnEvent);
document.addEventListener('mousemove', initGTMOnEvent);
document.addEventListener('touchstart', initGTMOnEvent);
function initGTMOnEvent(e) {
  initGTM();
  e.currentTarget.removeEventListener(e.type, initGTMOnEvent);
}
function initGTM() {
  if (window.gtmDidInit) {
    return false;
  }
  window.gtmDidInit = true;
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.onload = () => {
    dataLayer.push({ event: 'gtm.js', 'gtm.start': new Date().getTime(), 'gtm.uniqueEventId': 0 });
  };
  s.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WJ4J8X6';
  document.head.appendChild(s);
}`

function GoogleTagManager() {
  return (
    <>
      <script
        key="gtm"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: useSnippet(),
        }}
      />
    </>
  )
}

export default GoogleTagManager
