const load = document.querySelector(".loading");
const popup = document.querySelector(".popup");

const container = document.querySelector(".container");
const containerLoginDaftar = document.querySelector(".login-register");

const namaUser = document.querySelector("#namaUser");
const idUser = document.querySelector("#idUser");
const saldo = document.querySelector("#saldoUser");

const formLogin = document.querySelector(".form-login");
const formDaftar = document.querySelector(".form-daftar");

const inputNamaLogin = document.querySelector("#inputNamaLogin");
const inputPasswordLogin = document.querySelector("#inputPasswordLogin");

const inputNamaDaftar = document.querySelector("#inputNamaDaftar");
const inputPasswordDaftar1 = document.querySelector("#inputPasswordDaftar1");
const inputPasswordDaftar2 = document.querySelector("#inputPasswordDaftar2");

const inputNominal = document.querySelector("#inputNominal");
const inputBank = document.querySelector("#inputBank");
const btnTambahSaldo = document.querySelector("#btnTambahSaldo");
const btnTambahFavorit = document.querySelector("#btnTambahFavorit");

const btnLogin = document.querySelector("#btnLogin");
const btnDaftar = document.querySelector("#btnDaftar");

const pageBeranda = document.querySelector(".main-content-beranda");
const pageFavorit = document.querySelector(".main-content-favorit");
const pageRiwayat = document.querySelector(".main-content-riwayat");
const pageProfil = document.querySelector(".main-content-profil");

const btnPindahLogin = document.querySelector("#pindahLogin");
const btnPindahDaftar = document.querySelector("#pindahDaftar");

const btnBeranda = document.querySelector("#btnBeranda");
const btnFavorit = document.querySelector("#btnFavorit");
const btnRiwayat = document.querySelector("#btnRiwayat");
const btnProfil = document.querySelector("#btnProfil");

const listFavorit = document.querySelector("#listFavorit");

const showTopUp = document.querySelector("#showTopUp");

let users = [];
let currentUser = null;
let formTopUpTerbuka = false;
let popupTimer;

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
  const data = JSON.parse(localStorage.getItem("users")) || [];

  users = data;
  console.log(users);
}

function resetAll() {
  const pages = document.querySelectorAll(".page-content");
  pages.forEach((page) => {
    page.style.display = "none";
  });

  const buttons = document.querySelectorAll(".btn-navbar-bottom");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
}

function updateUserUI() {
  namaUser.textContent = currentUser.nama;
  idUser.textContent = currentUser.id;
  saldo.textContent = currentUser.saldo.toLocaleString("id-ID");
}

function daftar() {
  const username = inputNamaDaftar.value.trim();
  const pass1 = inputPasswordDaftar1.value.trim();
  const pass2 = inputPasswordDaftar2.value.trim();

  if (!username || !pass1 || !pass2) {
    showPopup("Nama dan Password tidak boleh kosong", "error");
    return;
  }

  if (pass1 !== pass2) {
    showPopup("Password berbeda", "error");
    return;
  }

  const usernameLower = username.toLowerCase();

  const userExist = users.find((u) => u.nama?.toLowerCase() === usernameLower);

  if (userExist) {
    showPopup("Nama sudah terdaftar!", "error");
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

  showPopup("Pendaftaran berhasil, silahkan Login!", "success");

  inputNamaDaftar.value = "";
  inputPasswordDaftar1.value = "";
  inputPasswordDaftar2.value = "";

  getUsers();
}

async function login() {
  const username = inputNamaLogin.value.trim();
  const pass = inputPasswordLogin.value.trim();

  if (!username || !pass) {
    showPopup("Nama dan Password tidak boleh kosong!", "error");
    return;
  }

  const userExsist = users.find((u) => u.nama === username);

  if (!userExsist) {
    showPopup("User tidak ditemukan!", "error");
    return;
  }

  try {
    showLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const validUser = users.find(
      (u) => u.nama === username && u.password === pass,
    );

    if (!validUser) throw "Password salah";

    containerLoginDaftar.style.display = "none";
    container.style.display = "flex";

    currentUser = validUser;
    updateUserUI();
    renderFavorit();
    console.log(currentUser);
  } catch (error) {
    showPopup("Nama atau Password salah!", "error");
  } finally {
    showLoading(false);
  }

  // console.log(users.includes(currentUser))
}

function showFormTopUp() {
  const formTopUp = document.querySelector("#topUpForm");
  formTopUp.style.display = "flex";
  formTopUpTerbuka = true;
}

function closeFormTopUp() {
  const formTopUp = document.querySelector("#topUpForm");
  formTopUp.style.display = "none";
  formTopUpTerbuka = false;

  inputNominal.value = "";
  inputBank.value = "";
}

function topUpSaldo() {
  const nominal = Number(inputNominal.value);
  const bank = inputBank.value;

  if (isNaN(nominal)) {
    showPopup("Masukkan angka yang valid!", "error");
  }

  if (!nominal || !bank) {
    showPopup("Form tidak boleh kosong!", "error");
    return;
  }

  if (nominal < 10000) {
    showPopup("Minimal topUp Rp10.000", "error");
    return;
  }

  currentUser.saldo += nominal;

  updateUserUI();

  showPopup("Berhasil Topup", "success");

  const formTopUp = document.querySelector("#topUpForm");
  formTopUp.style.display = "none";
  formTopUpTerbuka = false;

  inputNominal.value = "";
  inputBank.value = "";

  saveUsers();
}

function tambahFavorit() {
  const nominal = Number(inputNominal.value.trim());
  const bankInput = inputBank.value.trim().toLowerCase();

  if (isNaN(nominal)) {
    showPopup("Masukkan angka yang valid!", "error");
    return;
  }

  if (!nominal || !bankInput) {
    showPopup("Form tidak boleh kosong!", "error");
    return;
  }

  if (nominal < 10000) {
    showPopup("Minimal topUp Rp10.000", "error");
    return;
  }

  const favExsist = currentUser.favorit.find((fav) => {
    const favBankLower = fav.bank.trim().toLowerCase();
    return fav.nominal === nominal && favBankLower === bankInput;
  });

  if(favExsist) {
    showPopup('Sudah pernah ditambahkan ke favorit!', 'error')
    return
  }

  const newFavorit = {
    id: `FAV-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    nominal: nominal,
    bank: inputBank.value.trim(),
  };

  currentUser.favorit.push(newFavorit);

  saveUsers();

  showPopup("Berhasil di tambah ke Favorit", "success");
  console.log(currentUser);
  renderFavorit();
}

function renderFavorit() {
  const listFavorit = document.querySelector("#listFavorit");

  let html = "";

  currentUser.favorit.forEach((fav) => {
    html += `
      <li class="item-favorit" data-id="${fav.id}"> 
        <div class="box-text">
          <p>${fav.bank}</p>
          <p>Rp ${fav.nominal.toLocaleString("id-ID")}</p>
        </div>
        <button class="pakai-lagi">Pakai lagi</button>
        <button class="hapus-favorit">Hapus</button>
      </li>
    `;
  });

  listFavorit.innerHTML =
    html ||
    `<li style="list-style-type: none; color: gray; font-size: 13px; font-weight: bold; font-style: italic;">Belum ada favorit</li> `;
}

function hapusListFavorit(id) {
  currentUser.favorit = currentUser.favorit.filter((fav) => fav.id !== id);
  renderFavorit();
  saveUsers();
}

listFavorit.addEventListener("click", (e) => {
  const itemFavorit = e.target.closest(".item-favorit");
  if (!itemFavorit) return;

  const id = itemFavorit.dataset.id;

  if (e.target.classList.contains("hapus-favorit")) {
    hapusListFavorit(id);
  }

  if (e.target.classList.contains("pakai-lagi")) {
    const selectedFavorit = currentUser.favorit.find((fav) => fav.id === id);

    if (selectedFavorit) {
      inputNominal.value = selectedFavorit.nominal;
      inputBank.value = selectedFavorit.bank;

      showFormTopUp();
    }
  }
});

function showPopup(message, type) {
  popup.textContent = message;

  popup.classList.remove("success", "error");
  popup.classList.add(type);
  popup.classList.add("show");

  clearTimeout(popupTimer);

  popupTimer = setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
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

function showBeranda() {
  resetAll();
  pageBeranda.style.display = "flex";
  btnBeranda.classList.add("active");
  console.log("klik");
}

function showFavorit() {
  resetAll();
  pageFavorit.style.display = "flex";
  btnFavorit.classList.add("active");
  console.log("klik");
}

function showRiwayat() {
  resetAll();
  pageRiwayat.style.display = "flex";
  btnRiwayat.classList.add("active");
  console.log("klik");
}

function showProfil() {
  resetAll();
  pageProfil.style.display = "flex";
  btnProfil.classList.add("active");
  console.log("klik");
}

btnLogin.addEventListener("click", login);
btnDaftar.addEventListener("click", daftar);

btnPindahDaftar.addEventListener("click", () => {
  formLogin.style.display = "none";
  formDaftar.style.display = "flex";
});

btnPindahLogin.addEventListener("click", () => {
  formDaftar.style.display = "none";
  formLogin.style.display = "flex";
});

btnTambahFavorit.addEventListener("click", tambahFavorit);

btnTambahSaldo.addEventListener("click", topUpSaldo);

btnBeranda.addEventListener("click", showBeranda);
btnFavorit.addEventListener("click", showFavorit);
btnRiwayat.addEventListener("click", showRiwayat);
btnProfil.addEventListener("click", showProfil);

getUsers();
