const escapeDoubleQuote = s => s.replace(/"/g, '\\"');

const toUpperSnakeCase = s => {
  return (() => {
    // space case
    if (/\s/.test(s)) return s.replace(/\s+/g, '_');
    // kebab case
    if (/-/.test(s)) return s.replace(/-/g, '_');
    // assuming it is camel case
    return s.replace(/([a-z])([A-Z])/g, '$1_$2');
  })().toUpperCase();
};

const json2env = json => {
  const obj = JSON.parse(json);
  return Object.entries(obj)
    .map(([key, value]) => [toUpperSnakeCase(key), escapeDoubleQuote(String(value))])
    .map(([key, value]) => `${key}="${value}"`)
    .join('\n');
};

(() => {
  const $textarea = document.querySelector('textarea');
  const $result = document.querySelector('.result');
  const $error = document.querySelector('.error');

  const run = () => {
    try {
      $result.innerHTML = json2env($textarea.value);
      $error.innerHTML = "";
    } catch (e) {
      console.error(e);
      $error.innerHTML = e.message;
    }
  };

  $textarea.addEventListener('input', run);

  // initial textarea value
  $textarea.value = '{\n    "a": 3,\n    "happyDragon": "amazing!",\n    "sad dragon": "cool!",\n    "flying-draGon": "wow!",\n    "HelloWorld": "She said: \\"Hello World\\""\n}';
  run();
})();
