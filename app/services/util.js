const hashCode = (input) => {
  let hash = 0;
  let i;
  let chr;
  let len;
  if (input.length === 0) return hash;
  for (i = 0, len = input.length; i < len; i++) {
    chr = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/*
  Exported functions
 */
// TODO need tests
export const cleanUrl = (url) => {
  let result = '';
  result = url.split('?')[0].split('#')[0];
  result = result.split('://');
  return result.length > 0 ? result[1] : result[0];
};

export const idFromUrl = url => hashCode(cleanUrl(url));

export const isURLForbidden = (url) => {
  const injectableRegexp =
    new RegExp(/(^chrome.*)|(^https?:\/\/chrome\.google\.com\/webstore\/.*)/g);
  return injectableRegexp.test(url);
};
