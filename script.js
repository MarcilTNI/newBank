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

const inputNominalTopUp = document.querySelector("#inputNominalTopUp");
const inputNominalTarik = document.querySelector("#inputNominalTarik");
const kodeTarik = document.querySelector("#kodeTarik");
const inputBank = document.querySelector(".inputBank");
const inputTempatTarik = document.querySelector("#inputTempatTarik");
const btnTambahSaldo = document.querySelector("#btnTambahSaldo");
const btnTarikTunai = document.querySelector("#btnTarikTunai");
// const btnTambahFavorit = document.querySelector(".btnTambahFavorit");

const btnLogin = document.querySelector("#btnLogin");
const btnDaftar = document.querySelector("#btnDaftar");

const pageBeranda = document.querySelector(".main-content-beranda");
const pageFavorit = document.querySelector(".main-content-favorit");
const pageRiwayat = document.querySelector(".main-content-riwayat");
const pageProfil = document.querySelector(".main-content-profil");

const pageTransfer = document.querySelector(".section-content-transfer");
const pagePaketData = document.querySelector(".section-content-paket-data");
const pagePulsa = document.querySelector(".section-content-pulsa");
const pagePLN = document.querySelector(".section-content-pln");
const pageGame = document.querySelector(".section-content-game");
const pageTransportasi = document.querySelector(
  ".section-content-transportasi",
);

const contentTransferSamaBank = document.querySelector(
  ".content-transfer-sama-bank",
);
const contentTransferBedaBank = document.querySelector(
  ".content-transfer-beda-bank",
);
const pageKonfirmasiTransfer = document.querySelector(
  ".page-konfirmasi-transfer",
);

const inputIdTujuan = document.querySelector("#inputIdTujuan");
const inputNominalTransferSamaBank = document.querySelector(
  "#inputNominalTransferSamaBank",
);
const inputBankWalletTujuan = document.querySelector("#inputBankWalletTujuan");
const noPenerimaTransfer = document.querySelector("#noPenerimaTransfer");
const namaPenerimaTransfer = document.querySelector("#namaPenerimaTransfer");
const inputNominalTransferBedaBank = document.querySelector(
  "#inputNominalTransferBedaBank",
);
const passwordKonfirmasi = document.querySelector("#passwordKonfirmasi");
const transferBtn = document.querySelector("#transfer");

const btnPindahLogin = document.querySelector("#pindahLogin");
const btnPindahDaftar = document.querySelector("#pindahDaftar");

const btnBeranda = document.querySelector("#btnBeranda");
const btnFavorit = document.querySelector("#btnFavorit");
const btnRiwayat = document.querySelector("#btnRiwayat");
const btnProfil = document.querySelector("#btnProfil");

const btnTransfer = document.querySelector("#btnTransfer");
const btnPaketData = document.querySelector("#btnPaketData");
const btnPulsa = document.querySelector("#btnPulsa");
const btnPLN = document.querySelector("#btnPLN");
const btnTopUpGame = document.querySelector("#btnTopUpGame");
const btnTransportasi = document.querySelector("#btnTransportasi");

const btnTransferSamaBank = document.querySelector("#btnTransferSamaBank");
const btnTransferBedaBank = document.querySelector("#btnTransferBedaBank");

const listFavorit = document.querySelector("#listFavorit");

const showTopUp = document.querySelector("#showTopUp");
const showTarikTunai = document.querySelector("#showTarikTunai");

let users = [];
let currentUser = null;
let formTopUpTerbuka = false;
let formTarikTunaiTerbuka = false;
let popupTimer;

function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

function getUsers() {
  const data = JSON.parse(localStorage.getItem("users")) || [];

  users = data;
  console.log(users);
}

function resetPageContentAll() {
  const pages = document.querySelectorAll(".page-content");
  pages.forEach((page) => {
    page.style.display = "none";
  });

  const buttons = document.querySelectorAll(".btn-navbar-bottom");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
}

function resetPageSectionAll() {
  const pages = document.querySelectorAll(".page-section");
  pages.forEach((page) => {
    page.style.display = "none";
  });
}

function resetJenisContentTransferAll() {
  const pages = document.querySelectorAll(".content-transfer");
  pages.forEach((page) => {
    page.style.display = "none";
  });

  const buttons = document.querySelectorAll(".btn-tujuan");
  buttons.forEach((btn) => {
    btn.classList.remove("btn-tujuan-active");
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

  const usernameLower = username.toLowerCase();

  const userExsist = users.find((u) => u.nama?.toLowerCase() === usernameLower);

  if (!userExsist) {
    showPopup("User tidak ditemukan!", "error");
    return;
  }

  try {
    showLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const validUser = users.find(
      (u) => u.nama?.toLowerCase() === usernameLower && u.password === pass,
    );

    if (!validUser) throw "Password salah";

    containerLoginDaftar.style.display = "none";
    container.style.display = "flex";

    currentUser = validUser;
    updateUserUI();
    renderFavorit();
    renderRiwayat();
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

  inputNominalTopUp.value = "";
  inputBank.value = "";
}

function showFormTarikTunai() {
  const formTarikTunai = document.querySelector("#tarikTunaiForm");
  formTarikTunai.style.display = "flex";
  formTarikTunaiTerbuka = true;
  kodeTarik.textContent = `TRK-${Date.now().toString().slice(-5)}-${Math.floor(Math.random() * 1000)}`;
}

function closeFormTarikTunai() {
  const formTarikTunai = document.querySelector("#tarikTunaiForm");
  formTarikTunai.style.display = "none";
  formTopUpTerbuka = false;

  inputNominalTarik.value = "";
  inputTempatTarik.value = "";
}

function formatWaktu(timestamp) {
  return new Date(timestamp).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function topUpSaldo() {
  const nominal = Number(inputNominalTopUp.value);
  const bank = inputBank.value;

  if (isNaN(nominal)) {
    showPopup("Masukkan angka yang valid!", "error");
    return;
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

  const newRiwayat = {
    id: `HTR-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    jenis: "topup",
    nominal: nominal,
    bank: bank,
    waktu: Date.now(),
  };

  currentUser.riwayat.unshift(newRiwayat);

  showPopup("Berhasil Topup", "success");

  const formTopUp = document.querySelector("#topUpForm");
  formTopUp.style.display = "none";
  formTopUpTerbuka = false;

  inputNominalTopUp.value = "";
  inputBank.value = "";

  renderRiwayat();
  saveUsers();
}

function tarikTunai() {
  const nominal = Number(inputNominalTarik.value);
  const tempatTarik = inputTempatTarik.value;

  if (isNaN(nominal)) {
    showPopup("Masukkan angka yang valid!", "error");
    return;
  }

  if (!nominal || !tempatTarik) {
    showPopup("Form tidak boleh kosong!", "error");
    return;
  }

  if (nominal < 10000) {
    showPopup("Minimal topUp Rp10.000", "error");
    return;
  }

  if (nominal > currentUser.saldo) {
    showPopup("Uang di saldomu kurang!", "error");
    return;
  }

  currentUser.saldo -= nominal;

  updateUserUI();

  const newRiwayat = {
    id: `HTR-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    jenis: "tarikTunai",
    nominal: nominal,
    tempatTarik: tempatTarik,
    waktu: Date.now(),
  };

  currentUser.riwayat.unshift(newRiwayat);

  showPopup("Tarik tunai berhasil", "success");

  const formTarikTunai = document.querySelector("#tarikTunaiForm");
  formTarikTunai.style.display = "none";
  formTopUpTerbuka = false;

  inputNominalTarik.value = "";
  inputTempatTarik.value = "";

  renderRiwayat();
  saveUsers();
}

// function transfer() {

// }

function renderFavorit() {
  const listFavorit = document.querySelector("#listFavorit");

  let html = "";

  currentUser.favorit.forEach((fav) => {
    html += `
      <li class="item-favorit" data-id="${fav.id}"> 
        <div class="box-text">
          <p>${fav.lokTransaksi} - ${fav.jenis.toUpperCase()}</p>
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

function renderRiwayat() {
  const listRiwayatUI = document.querySelector("#listRiwayat");

  let html = "";

  currentUser.riwayat.forEach((list) => {
    const waktuDibaca = formatWaktu(list.waktu);

    let tanda = list.jenis === "topup" ? "+" : "-";
    let warnaNominal = list.jenis === "topup" ? "text-green" : "text-red";

    html += `
      <li class="item-riwayat ${list.jenis}" data-id="${list.id}">
        <div>
          <strong>${list.jenis.toUpperCase()}</strong> - ${list.bank || list?.tempatTarik}
          <br>
          <small>${waktuDibaca}</small>
        </div>
        <div>
          <span class="${warnaNominal}">${tanda} ${list.nominal.toLocaleString("id-ID")}</span>
          <button class="btn-tambah-fav" title="Simpan ke favorit"><i class="fa-regular fa-star"></i></button>
        </div>     
      </li>  
    `;
  });

  listRiwayatUI.innerHTML =
    html ||
    `<li style="list-style-type: none; color: gray; font-size: 13px; font-weight: bold; font-style: italic;">Belum ada transaksi</li> `;
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

    if (selectedFavorit.jenis === "topup") {
      inputNominalTopUp.value = selectedFavorit.nominal;
      inputBank.value = selectedFavorit.lokTransaksi;
      showFormTopUp();
    } else if (selectedFavorit.jenis === "tarikTunai") {
      inputNominalTarik.value = selectedFavorit.nominal;
      inputTempatTarik.value = selectedFavorit.lokTransaksi;
      showFormTarikTunai();
    }
  }
});

const listRiwayatUI = document.querySelector("#listRiwayat");

listRiwayatUI.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-tambah-fav")) {
    const itemRiwayat = e.target.closest(".item-riwayat");
    const idRiwayat = itemRiwayat.dataset.id;

    const transaksiTarget = currentUser.riwayat.find(
      (item) => item.id === idRiwayat,
    );

    if (transaksiTarget) {
      const sudahAda = currentUser.favorit.some((fav) => {
        return (
          fav.nominal === transaksiTarget.nominal &&
          fav.lokTransaksi ===
            (transaksiTarget.bank || transaksiTarget.tempatTarik)
        );
      });

      if (sudahAda) {
        showPopup("Transaksi ini sudah ada di favorit!", "error");
        return;
      }

      currentUser.favorit.push({
        id: `FAV-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
        jenis: transaksiTarget.jenis,
        nominal: transaksiTarget.nominal,
        lokTransaksi: transaksiTarget.bank || transaksiTarget.tempatTarik,
      });

      console.log(currentUser.favorit);

      saveUsers();
      renderFavorit();
      showPopup("Berhasil ditambahkan ke favorit", "success");
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
  resetPageContentAll();
  resetPageSectionAll();
  pageBeranda.style.display = "flex";
  btnBeranda.classList.add("active");
  // console.log("klik");
}

function showFavorit() {
  resetPageContentAll();
  resetPageSectionAll();
  pageFavorit.style.display = "flex";
  btnFavorit.classList.add("active");
  // console.log("klik");
}

function showRiwayat() {
  resetPageContentAll();
  resetPageSectionAll();
  pageRiwayat.style.display = "flex";
  btnRiwayat.classList.add("active");
  // console.log("klik");
}

function showProfil() {
  resetPageContentAll();
  resetPageSectionAll();
  pageProfil.style.display = "flex";
  btnProfil.classList.add("active");
  // console.log("klik");
}

function showTransfer() {
  resetPageContentAll();
  resetPageSectionAll();
  pageTransfer.style.display = "flex";
}

function showPaketData() {
  resetPageContentAll();
  resetPageSectionAll();
  pagePaketData.style.display = "flex";
}

function showPulsa() {
  resetPageContentAll();
  resetPageSectionAll();
  pagePulsa.style.display = "flex";
}

function showPLN() {
  resetPageContentAll();
  resetPageSectionAll();
  pagePLN.style.display = "flex";
}

function showTopUpGame() {
  resetPageContentAll();
  resetPageSectionAll();
  pageGame.style.display = "flex";
}

function showTransportasi() {
  resetPageContentAll();
  resetPageSectionAll();
  pageTransportasi.style.display = "flex";
}

function showTransferSamaBank() {
  resetJenisContentTransferAll();
  contentTransferSamaBank.style.display = "flex";
  btnTransferSamaBank.classList.add("btn-tujuan-active");
}

function showTransferBedaBank() {
  resetJenisContentTransferAll();
  contentTransferBedaBank.style.display = "flex";
  btnTransferBedaBank.classList.add("btn-tujuan-active");
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

// btnTambahFavorit.addEventListener("click", tambahFavorit);

btnTambahSaldo.addEventListener("click", topUpSaldo);
btnTarikTunai.addEventListener("click", tarikTunai);

btnBeranda.addEventListener("click", showBeranda);
btnFavorit.addEventListener("click", showFavorit);
btnRiwayat.addEventListener("click", showRiwayat);
btnProfil.addEventListener("click", showProfil);

btnTransfer.addEventListener("click", showTransfer);
btnPaketData.addEventListener("click", showPaketData);
btnPulsa.addEventListener("click", showPulsa);
btnPLN.addEventListener("click", showPLN);
btnTopUpGame.addEventListener("click", showTopUpGame);
btnTransportasi.addEventListener("click", showTransportasi);

btnTransferSamaBank.addEventListener("click", showTransferSamaBank);
btnTransferBedaBank.addEventListener("click", showTransferBedaBank);

getUsers();
