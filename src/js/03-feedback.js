import throttle from "lodash.throttle";
const FORMDATA_KEY = 'formData';
const formRef = document.querySelector('form.feedback-form');
const emailRef = document.querySelector('form input[name="email"]');
const messageRef = document.querySelector('form textarea[name="message"]');
const formData = {};

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);
onPageLoad();

function onFormInput(e) {
  // setting email and message separately to count for
  // delay of throttle and possibility of data loss
  formData.email = emailRef.value;
  formData.message = messageRef.value;

  // setting data to local storage
  localStorage.setItem(FORMDATA_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  const { email, message } = e.currentTarget;

  // setting form data to variable
  formData[email.name] = email.value;
  formData[message.name] = message.value;

  // removing local storage saved data
  localStorage.removeItem(FORMDATA_KEY);

  // resetting form
  e.currentTarget.reset();

  // sending entered data to wherever (bakend)
  console.log('Form submitted: email: ' + formData.email + ', message: ' + formData.message);
}

function onPageLoad() {
  const savedLocalDataText = localStorage.getItem(FORMDATA_KEY);

  // checking if there is saved data
  if (savedLocalDataText) {
    const savedLocalData = JSON.parse(savedLocalDataText);

    console.log('Found saved data, filling in fields');

    // populating fields with saved data
    emailRef.value = formData.email = savedLocalData.email;
    messageRef.value = formData.message = savedLocalData.message;
  } else {
    console.log('Starting new form');
  }
}