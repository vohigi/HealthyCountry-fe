export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
export const getBearer = () => {
  try {
    return window.localStorage.token;
  } catch (e) {
    return false;
  }
};
export const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

export const getUserMedia = (params = { audio: true, video: true }) => {
  // Старые браузеры могут не реализовывать свойство mediaDevices,
  // поэтому вначале присваеваем свойству ссылку на пустой объект

  if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
  }

  // Некоторые браузеры частично реализуют свойство mediaDevices, поэтому
  // мы не можем присвоить ссылку на объект свойству getUserMedia, поскольку
  // это переопределит существующие свойства. Здесь, просто добавим свойство
  // getUserMedia , если оно отсутствует.

  if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
          // Сначала, если доступно, получим устаревшее getUserMedia

          const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          // Некоторые браузеры не реализуют его, тогда вернем отмененный промис
          // с ошибкой для поддержания последовательности интерфейса

          if (!getUserMedia) {
              return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }

          // Иначе, обернем промисом устаревший navigator.getUserMedia

          return new Promise(((resolve, reject) => {
              getUserMedia.call(navigator, constraints, resolve, reject);
          }));
      };
  }

  return navigator.mediaDevices.getUserMedia(params);
};