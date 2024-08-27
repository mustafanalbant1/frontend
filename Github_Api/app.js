const githubForm = document.getElementById("github-form");
const githubName = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListener();

function eventListener() {
  githubForm.addEventListener("submit", getData);
  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {
  let username = githubName.value.trim();

  if (username === "") {
    alert("Geçerli bir kullanıcı adı giriniz");
  } else {
    github
      .getGithubData(username)
      .then((response) => {
        if (response.user.message === "Not Found") {
          ui.showError("Kullanıcı Bulunamadı");
        } else {
          ui.addSearchedUserToUI(username);
          Storage.addSearchedUserToStorage(username);
          ui.showUserInfo(response.user);
          ui.showRepoInfo(response.repo); // showRepoInfo fonksiyonu kullanılmalı
        }
      })
      .catch((err) => ui.showError(err));
  }
  ui.clearInput(); // Input temizleme
  e.preventDefault();
}

function clearAllSearched() {
  //Tüm aramaları temizle
  if (confirm("Emin misiniz?")) {
    //Silme
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearched();
  }
}

function getAllSearched() {
  // Arananları storageden al ve UI ye ekle

  let users = Storage.getSearchedUsersFromStorage();
  let result = "";

  users.forEach((user) => {
    result += `<li class="list-group-item">${user}</li>`;
  });
  lastUsers.innerHTML = result;
}
