const load = document.querySelector(".loading");

const container = document.querySelector(".container");

const formLogin = document.querySelector(".form-login");
const formDaftar = document.querySelector(".form-daftar");

const inputNamaLogin = document.querySelector("#inputNamaLogin");
const inputPasswordLogin = document.querySelector("#inputPasswordLogin");

const inputNamaDaftar = document.querySelector("#inputNamaDaftar");
const inputPasswordDaftar1 = document.querySelector("#inputPasswordDaftar1");
const inputPasswordDaftar2 = document.querySelector("#inputPasswordDaftar2");

const btnLogin = document.querySelector("#btnLogin");
const btnDaftar = document.querySelector("#btnDaftar");

const btnPindahLogin = document.querySelector("#pindahLogin");
const btnPindahDaftar = document.querySelector("#pindahDaftar");

let users = [];
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
  const data = JSON.parse(localStorage.getItem("users"));
}

function daftar() {
  const username = inputNamaDaftar.value;
  const pass1 = inputPasswordDaftar1.value;
  const pass2 = inputPasswordDaftar2.value;

  if (!username || !pass1 || !pass2) {
    showError("Nama dan Password tidak boleh kosong");
    return;
  }

  if (pass1 !== pass2) {
    showError("Password berbeda");
    return;
  }

  const userExist = users.find((u) => u.nama === username);

  if (userExist) {
    showError("Nama sudah terdaftar!");
    return;
  }

  const newUser = {
    id: `USR-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    nama: username,
    password: pass1,
    saldo: 0,
    riwayat: [],
    favorit: [],
  };

  users.push(newUser);

  saveUsers();

  showSucces("Pendaftaran berhasil, silahkan Login!");

  inputNamaDaftar.value = "";
  inputPasswordDaftar1.value = "";
  inputPasswordDaftar2.value = "";

  setTimeout(() => (err.innerHTMl = ""), 2000);
}

async function login() {
  const username = inputNamaLogin.value;
  const pass = inputPasswordLogin.value;

  if (!username || !pass) {
    showError("Nama dan Password tidak boleh kosong!");
    return;
  }

  const userExist = users.find((u) => u.nama === username);

  if (!userExist) {
    showError("User tidak ditemukan!");
    return;
  }

  try {
    showLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const validUser = users.find(
      (u) => u.nama === username && u.password === pass,
    );

    if (!validUser) throw "Password salah!";

    formLogin.style.display = "none";
    container.style.display = "flex";
  } catch (err) {
    showError("Nama atau Password salah!");
  } finally {
    showLoading(false);
  }
}

function showError(message) {
  err.innerHTML = `
        <div class="card error">
            <h1>Error!!</h1>
            <p>${message}</p>
        </div>
    `;
  setTimeout(() => (err.innerHTML = ""), 2000);
}

function showSuccess(message) {
  err.innerHTML = `
        <div class="card success">
            <h1>Success!!</h1>
            <p>${message}</p>
        </div>
    `;
  setTimeout(() => (err.innerHTML = ""), 2000);
}

function showLoading(state) {
  if (state) {
    load.innerHTML = `
            <div class="popup-loading">
                <div class="load"></div>
                <p>Harap tunggu...</p>
            </div>
        `;
    btnLogin.disabled = true;
    btnDaftar.disabled = true;
    btnPindahLogin.disabled = true;
    btnPindahDaftar.disabled = true;
    btnLogin.style.cursor = "not-allowed";
    btnDaftar.style.cursor = "not-allowed";
    btnPindahLogin.style.cursor = "not-allowed";
    btnPindahDaftar.style.cursor = "not-allowed";
  } else {
    load.innerHTML = "";
    btnLogin.disabled = false;
    btnDaftar.disabled = false;
    btnPindahLogin.disabled = false;
    btnPindahDaftar.disabled = false;
    btnLogin.style.cursor = "pointer";
    btnDaftar.style.cursor = "pointer";
    btnPindahLogin.style.cursor = "pointer";
    btnPindahDaftar.style.cursor = "pointer";
  }
}
