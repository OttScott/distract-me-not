export function isUrl(url) {
  return url.match(
    /(^|\s)((https?:\/\/)?(localhost(:\d+)?$|(\*?|[\w-]+)(\.[\w-]+)+\.?(:\d+)?(\/\S*)?))/gi
  );
}

export function stripUrl(url) {
  return url.split('?')[0];
}

export function getHostname(url) {
  return url.replace(/^(?:.*:\/\/)?(?:(?:www|m|\*)\.)?([^/]+).*/i, '$1');
}

export function getFaviconLink(url) {
  return `https://${getHostname(url)}/favicon.ico`;
}

export function checkFaviconLink(faviconLink) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = function () {
      resolve(true);
    };
    image.onerror = function () {
      resolve(false);
    };
    image.src = faviconLink;
  });
}

// prettier-ignore
export function hasValidProtocol(url) {
  return /^((ftps?|https?|file|chrome|edge|moz-extension|chrome-extension|extension):\/\/|about:)/i.test(url);
}

export function getValidUrl(url) {
  if (url && url.length && !hasValidProtocol(url)) {
    return 'https://' + url;
  }
  return url;
}
