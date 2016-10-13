export const toDataUrl = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.send();
};
