import { throttle } from 'lodash';

const KEY_STORAGE = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onTextInput, 500));
populateText();

function onFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const finalData = {};
  for (const [key, value] of formData.entries()) {
    if (value === '') {
      alert('не всі поля заповнені');
      return;
    }
    finalData[key] = value;
  }
  console.log(finalData);
  e.currentTarget.reset();
  localStorage.removeItem(KEY_STORAGE);
}

function onTextInput(e) {
  const { name, value } = e.target;
  const parsedData = JSON.parse(localStorage.getItem(KEY_STORAGE));
  if (parsedData) {
    const formData = {
      ...parsedData,
      [name]: value,
    };
    localStorage.setItem(KEY_STORAGE, JSON.stringify(formData));
  } else {
    const formData = { [name]: value };
    localStorage.setItem(KEY_STORAGE, JSON.stringify(formData));
  }
}

function populateText() {
  const parsedData = JSON.parse(localStorage.getItem(KEY_STORAGE));
  if (parsedData) {
    const inputNames = Object.keys(parsedData);
    inputNames.forEach(inputName => {
      const input = formRef.elements[inputName];
      input.value = parsedData[inputName];
    });
  }
}
