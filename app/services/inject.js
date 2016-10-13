import axios from 'axios';

let prefix = 'http://localhost:3000/';
if (process.env.NODE_ENV === 'production') {
  prefix = '/';
}

export const injectExtraction = () => {
  inject('inject-extraction');
};

export const injectToastr = () => {
  injectResources([
    'vendor/toastr.min.css',
    'vendor/toastr.min.js'
  ]).then(() => {
    inject('inject-toastr');
  });
};

const inject = (id) => {
  const injectPath = `${prefix}js/${id}.bundle.js`;
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    axios.get(injectPath)
      .then((result) => {
        chrome.tabs.executeScript(tabs[0].id, { code: result.data });
      });
  });
};

const injectResources = (files) => {
  const getFileExtension = /(?:\.([^.]+))?$/;

  //helper function that returns appropriate chrome.tabs function to load resource
  const loadFunctionForExtension = (ext) => {
    switch (ext) {
      case 'js' : return chrome.tabs.executeScript;
      case 'css' : return chrome.tabs.insertCSS;
      default: throw new Error('Unsupported resource type');
    }
  };

  return Promise.all(files.map(resource => new Promise((resolve, reject) => {
    const ext = getFileExtension.exec(resource)[1];
    const loadFunction = loadFunctionForExtension(ext);
    loadFunction(null, { file: resource }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  })));
};
