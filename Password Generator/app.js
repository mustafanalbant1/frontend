const passwordBox = document.getElementById("password");
const button = document.querySelector("#button");
const copy = document.getElementById("copy-icon");

const length = 12;
const upperCase = "QWERTYUIOPASDFGHJKLZXCVBNM";
const lowerCase = "qwertyuiopasdfghjklzxcvbnm";
const number = "0123456789";
const symbol = "@#$%&*()_+~{}[]></?-=";

const allChars = upperCase + lowerCase + number + symbol;

button.addEventListener("click", createPassword);
copy.addEventListener("click", copyPasswor);

function createPassword() {
  let password = "";
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += number[Math.floor(Math.random() * number.length)];
  password += symbol[Math.floor(Math.random() * symbol.length)];

  while (length > password.length) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  passwordBox.value = password;
}

function copyPasswor() {
  passwordBox.select();
  document.execCommand("copy");
}
