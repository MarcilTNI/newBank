// Elemen global untuk indikator loading dan notifikasi aplikasi.
const load = document.querySelector(".loading");
const popup = document.querySelector(".popup");

// Wadah utama aplikasi dan area autentikasi pengguna.
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

const btnLogin = document.querySelector("#btnLogin");
const btnDaftar = document.querySelector("#btnDaftar");

const pageBeranda = document.querySelector(".main-content-beranda");
const pageFavorit = document.querySelector(".main-content-favorit");
const pageRiwayat = document.querySelector(".main-content-riwayat");
const pageProfil = document.querySelector(".main-content-profil");

// Referensi halaman atau section yang dikontrol melalui navigasi aplikasi.
const pageTransfer = document.querySelector(".section-content-transfer");
const pagePaketData = document.querySelector(".section-content-paket-data");
const pagePulsa = document.querySelector(".section-content-pulsa");
const pagePLN = document.querySelector(".section-content-pln");
const pageGame = document.querySelector(".section-content-game");
const pageTransportasi = document.querySelector(
  ".section-content-transportasi",
);

// Elemen utama untuk memilih jenis transfer dan menampilkan konfirmasi.
const boxBtnTransfer = document.querySelector(".box-btn-pilih-transfer");
const contentTransferSamaBank = document.querySelector(
  ".content-transfer-sama-bank",
);
const contentTransferBedaBank = document.querySelector(
  ".content-transfer-beda-bank",
);
const pageKonfirmasiTransferSamaBank = document.querySelector(
  ".page-konfirmasi-transfer-sama-bank",
);
const pageKonfirmasiTransferBedaBank = document.querySelector(
  ".page-konfirmasi-transfer-beda-bank",
);

const inputIdTujuan = document.querySelector("#inputIdTujuan");
const inputNominalTransferSamaBank = document.querySelector(
  "#inputNominalTransferSamaBank",
);

const inputBankWalletTujuan = document.querySelector("#inputBankWalletTujuan");
const inputNoPenerimaTransfer = document.querySelector("#noPenerimaTransfer");
const inputNamaPenerimaTransfer = document.querySelector(
  "#namaPenerimaTransfer",
);
const inputNominalTransferBedaBank = document.querySelector(
  "#inputNominalTransferBedaBank",
);
const passwordKonfirmasiSamaBank = document.querySelector(
  "#passwordKonfirmasiSamaBank",
);
const passwordKonfirmasiBedaBank = document.querySelector(
  "#passwordKonfirmasiBedaBank",
);
const btnKonfirmasiTransferSamaBank = document.querySelector(
  "#konfirmasiTransferSamaBank",
);
const btnKonfirmasiTransferBedaBank = document.querySelector(
  "#konfirmasiTransferBedaBank",
);
const btnBatalTransferSamaBank = document.querySelector(
  "#btnBatalTransferSamaBank",
);
const btnBatalTransferBedaBank = document.querySelector(
  "#btnBatalTransferBedaBank",
);
const transferSamaBtn = document.querySelector("#transferSamaBank");
const transferBedaBtn = document.querySelector("#transferBedaBank");
const logoutBtn = document.querySelector("#logoutBtn");

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
const nomorTelepon = document.querySelector("#nomorTelepon");
const cariNomor = document.querySelector("#cariNomor");
const outputPulsa = document.querySelectorAll(".output-pulsa");

const prefixOperators = {
  tri: ["0895", "0896", "0897", "0898", "0899"],
  indosat: ["0814", "0815", "0816", "0855", "0856", "0857"],
  telkomsel: ["0811", "0812", "0813", "0821", "0822", "0852", "0853"],
  xl: ["0817", "0818", "0819", "0859", "0877", "0878"],
};

const namaOperator = {
  tri: "Tri",
  indosat: "Indosat",
  telkomsel: "Telkomsel",
  xl: "XL",
};

// Seluruh akun yang tersimpan dan akun yang sedang login.
let users = [];
let currentUser = null;

// Timer untuk menghapus notifikasi popup secara otomatis.
let popupTimer;

/** Menyimpan seluruh data pengguna ke localStorage. */
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

/** Mengambil data pengguna dari localStorage saat aplikasi dimulai. */
function getUsers() {
  const data = JSON.parse(localStorage.getItem("users")) || [];

  users = data;
}

/** Menyembunyikan semua halaman utama dan mereset navbar aktif. */
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

/** Menyembunyikan seluruh section fitur di dalam halaman utama. */
function resetPageSectionAll() {
  const pages = document.querySelectorAll(".page-section");
  pages.forEach((page) => {
    page.style.display = "none";
  });
}

/** Mereset pilihan jenis transfer dan tombol tujuan yang aktif. */
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

/** Menyegarkan nama, ID, saldo, dan data profil pengguna aktif. */
function updateUserUI() {
  if (!currentUser) return;
  namaUser.textContent = currentUser.nama;
  idUser.textContent = currentUser.id;
  saldo.textContent = currentUser.saldo.toLocaleString("id-ID");

  const profileName = document.querySelector("#profileName");
  const profileId = document.querySelector("#profileId");
  const profileSaldo = document.querySelector("#profileSaldo");

  if (profileName) profileName.textContent = currentUser.nama;
  if (profileId) profileId.textContent = currentUser.id;
  if (profileSaldo)
    profileSaldo.textContent = `Rp ${currentUser.saldo.toLocaleString("id-ID")}`;
}

/** Mendaftarkan akun baru setelah memvalidasi data dan password. */
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

/** Memvalidasi kredensial lalu membuka aplikasi untuk pengguna yang berhasil login. */
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
  } catch (err) {
    showPopup("Nama atau Password salah!", "error");
  } finally {
    showLoading(false);
  }
}

/** Membuka form top up. */
function showFormTopUp() {
  const formTopUp = document.querySelector("#topUpForm");
  formTopUp.style.display = "flex";
}

/** Menutup form top up dan mereset inputnya. */
function closeFormTopUp() {
  const formTopUp = document.querySelector("#topUpForm");
  formTopUp.style.display = "none";

  inputNominalTopUp.value = "";
  inputBank.value = "";
}

/** Membuka form tarik tunai serta membuat kode transaksi baru. */
function showFormTarikTunai() {
  const formTarikTunai = document.querySelector("#tarikTunaiForm");
  formTarikTunai.style.display = "flex";
  kodeTarik.textContent = `TRK-${Date.now().toString().slice(-5)}-${Math.floor(Math.random() * 1000)}`;
}

/** Menutup form tarik tunai dan mereset inputnya. */
function closeFormTarikTunai() {
  const formTarikTunai = document.querySelector("#tarikTunaiForm");
  formTarikTunai.style.display = "none";

  inputNominalTarik.value = "";
  inputTempatTarik.value = "";
}

/** Mengubah timestamp transaksi menjadi format tanggal dan waktu Indonesia. */
function formatWaktu(timestamp) {
  return new Date(timestamp).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Menambah saldo pengguna dan mencatat transaksi top up. */
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

  inputNominalTopUp.value = "";
  inputBank.value = "";

  renderRiwayat();
  saveUsers();
}

/** Mengurangi saldo pengguna dan mencatat transaksi tarik tunai. */
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

  inputNominalTarik.value = "";
  inputTempatTarik.value = "";

  renderRiwayat();
  saveUsers();
}

/** Memvalidasi transfer sesama bank lalu menampilkan halaman konfirmasi. */
function funcTransferSamaBank() {
  const idUnik = inputIdTujuan.value.trim().toString();
  const nominal = Number(inputNominalTransferSamaBank.value);
  const bankTujuan = document.querySelector("#bankTujuan");
  const idUnikTujuan = document.querySelector("#idUnikTujuan");
  const nominalTransfer = document.querySelector("#nominalTransferSamaBank");
  const namaPenerima = document.querySelector("#namaTujuanTransfer1");

  const idExsist = users.find((u) => u.id === idUnik);

  if (isNaN(nominal)) {
    showPopup("Masukkan angka yang valid!", "error");
    return;
  }

  if (nominal <= 0 || !idUnik) {
    showPopup("Form tidak boleh kosong!", "error");
    return;
  }

  if (!idExsist) {
    showPopup("Tujuan transfer mu tidak ditemukan!", "error");
    return;
  }

  if (idUnik === currentUser.id) {
    showPopup("Tidak bisa transfer ke diri sendiri kocak!", "error");
    return;
  }

  if (nominal > currentUser.saldo) {
    showPopup("Uang di saldomu kurang!", "error");
    return;
  }

  resetJenisContentTransferAll();
  boxBtnTransfer.style.display = "none";

  bankTujuan.textContent = "Bank Marcel";
  namaPenerima.textContent = `Penerima: ${idExsist.nama}`;
  idUnikTujuan.textContent = `ID: ${idUnik}`;
  nominalTransfer.textContent = `Rp${nominal.toLocaleString("id-ID")}`;

  showPageKonfirmasiTransferSamaBank();
}

/** Memvalidasi transfer beda bank, termasuk fee, lalu menampilkan konfirmasi. */
function funcTransferBedaBank() {
  const bankWalletTujuanTransfer = inputBankWalletTujuan.value.trim();
  const noPenerimaTransfer = inputNoPenerimaTransfer.value.trim();
  const namaPenerimaTransfer = inputNamaPenerimaTransfer.value.trim();
  const nominal = Number(inputNominalTransferBedaBank.value.trim());

  const bankWalletTujuan = document.querySelector("#bankWalletTujuan");
  const namaPenerima = document.querySelector("#namaTujuanTransfer2");
  const noRekAtauNoTelp = document.querySelector("#noRekNoTelp");
  const nominalTransfer = document.querySelector("#nominalTransferBedaBank");

  if (isNaN(nominal)) {
    showPopup("Masukkan angka yang valid!", "error");
    return;
  }

  if (
    nominal <= 0 ||
    !noPenerimaTransfer ||
    !namaPenerimaTransfer ||
    !bankWalletTujuanTransfer
  ) {
    showPopup("Form tidak boleh kosong!", "error");
    return;
  }

  const biayaTransfer = 2500;
  if (nominal + biayaTransfer > currentUser.saldo) {
    showPopup("Uang di saldo mu kurang!", "error");
    return;
  }

  resetJenisContentTransferAll();
  boxBtnTransfer.style.display = "none";

  bankWalletTujuan.textContent = bankWalletTujuanTransfer;
  namaPenerima.textContent = `Penerima: ${namaPenerimaTransfer}`;
  noRekAtauNoTelp.textContent = `No: ${noPenerimaTransfer}`;
  nominalTransfer.textContent = `Rp${nominal.toLocaleString("id-ID")} + Fee Rp${biayaTransfer.toLocaleString("id-ID")}`;

  showPageKonfirmasiTransferBedaBank();
}

/** Menampilkan halaman konfirmasi transfer sesama bank. */
function showPageKonfirmasiTransferSamaBank() {
  pageKonfirmasiTransferSamaBank.style.display = "flex";
}
/** Menampilkan halaman konfirmasi transfer beda bank. */
function showPageKonfirmasiTransferBedaBank() {
  pageKonfirmasiTransferBedaBank.style.display = "flex";
}

/** Membatalkan transfer dan mengembalikan form ke keadaan awal. */
function batalTransfer() {
  passwordKonfirmasiSamaBank.value = "";
  passwordKonfirmasiBedaBank.value = "";
  inputIdTujuan.value = "";
  inputNominalTransferSamaBank.value = "";
  inputBankWalletTujuan.value = "";
  inputNoPenerimaTransfer.value = "";
  inputNamaPenerimaTransfer.value = "";
  inputNominalTransferBedaBank.value = "";

  pageKonfirmasiTransferSamaBank.style.display = "none";
  pageKonfirmasiTransferBedaBank.style.display = "none";
  boxBtnTransfer.style.display = "flex";
  resetJenisContentTransferAll();
  showBeranda();
}

/** Memverifikasi password lalu memindahkan saldo antar pengguna dalam bank yang sama. */
function konfirmasiTransferSamaBank() {
  const passwordInput = passwordKonfirmasiSamaBank.value.trim();
  const idTujuan = inputIdTujuan.value.trim();
  const nominal = Number(inputNominalTransferSamaBank.value);

  if (!passwordInput) {
    showPopup("Isi password konfirmasi!", "error");
    return;
  }

  if (passwordInput !== currentUser.password) {
    showPopup("Password salah!", "error");
    return;
  }

  const userPenerima = users.find((u) => u.id === idTujuan);
  if (!userPenerima) {
    showPopup("Akun penerima tidak ditemukan", "error");
    return;
  }

  currentUser.saldo -= nominal;
  userPenerima.saldo += nominal;

  const waktuTransaksi = Date.now();
  const idRiwayatPengirim = `HTR-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

  const riwayatPengirim = {
    id: idRiwayatPengirim,
    jenis: "transferKeluarSamaBank",
    nominal: nominal,
    bank: `Ke ${userPenerima.nama} (${userPenerima.id})`,
    waktu: waktuTransaksi,
    idUnikTujuan: idTujuan,
  };

  const riwayatPenerima = {
    id: `HTR-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    jenis: "transferMasuk",
    nominal: nominal,
    bank: `Dari ${currentUser.nama} (${currentUser.id})`,
    waktu: waktuTransaksi,
  };

  currentUser.riwayat.unshift(riwayatPengirim);
  userPenerima.riwayat.unshift(riwayatPenerima);

  updateUserUI();
  renderRiwayat();
  saveUsers();
  showPopup("Transfer berhasil!", "success");

  passwordKonfirmasiSamaBank.value = "";
  inputIdTujuan.value = "";
  inputNominalTransferSamaBank.value = "";

  pageKonfirmasiTransferSamaBank.style.display = "none";
  boxBtnTransfer.style.display = "flex";
  showBeranda();
}

/** Memverifikasi password, memotong fee, dan mencatat transfer ke bank lain. */
function konfirmasiTransferBedaBank() {
  const passwordInput = passwordKonfirmasiBedaBank.value.trim();
  const bankWalletTujuanTransfer = inputBankWalletTujuan.value.trim();
  const noPenerimaTransfer = inputNoPenerimaTransfer.value.trim();
  const namaPenerimaTransfer = inputNamaPenerimaTransfer.value.trim();
  const nominal = Number(inputNominalTransferBedaBank.value.trim());
  const biayaTransfer = 2500;

  if (!passwordInput) {
    showPopup("Isi Password konfirmasi!", "error");
    return;
  }

  if (passwordInput !== currentUser.password) {
    showPopup("Password salah!", "error");
    return;
  }

  currentUser.saldo -= nominal + biayaTransfer;

  const newRiwayat = {
    id: `HTR-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    jenis: "transferKeluarBedaBank",
    nominal: nominal,
    biaya: biayaTransfer,
    bank: `Ke ${bankWalletTujuanTransfer} - (${noPenerimaTransfer})`,
    waktu: Date.now(),
    tujuan: bankWalletTujuanTransfer,
    noPenerima: noPenerimaTransfer,
    namaPenerima: namaPenerimaTransfer,
  };

  currentUser.riwayat.unshift(newRiwayat);

  updateUserUI();
  renderRiwayat();
  saveUsers();
  showPopup("Transfer berhasil!", "success");

  passwordKonfirmasiBedaBank.value = "";
  inputNoPenerimaTransfer.value = "";
  inputNamaPenerimaTransfer.value = "";
  inputNominalTransferBedaBank.value = "";

  pageKonfirmasiTransferBedaBank.style.display = "none";
  boxBtnTransfer.style.display = "flex";
  showBeranda();
}

/** Menampilkan daftar transaksi favorit pengguna aktif. */
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

/** Menampilkan riwayat transaksi beserta nominal dan tombol favorit. */
function renderRiwayat() {
  const listRiwayatUI = document.querySelector("#listRiwayat");

  let html = "";

  const labelJenis = {
    topup: "Top Up",
    tarikTunai: "Tarik Tunai",
    transferKeluarSamaBank: "Transfer Keluar Sesama Bank",
    transferKeluarBedaBank: "Transfer Keluar Beda Bank",
    transferMasuk: "Transfer Masuk",
  };

  currentUser.riwayat.forEach((list) => {
    const waktuDibaca = formatWaktu(list.waktu);
    const jenisLabel = labelJenis[list.jenis] || list.jenis;
    const deskripsi = list.bank || list.tempatTarik || "Transaksi";

    let tanda =
      list.jenis === "topup" || list.jenis === "transferMasuk" ? "+" : "-";
    let warnaNominal =
      list.jenis === "topup" || list.jenis === "transferMasuk"
        ? "text-green"
        : "text-red";

    html += `
      <li class="item-riwayat ${list.jenis}" data-id="${list.id}">
        <div class="riwayat-info">
          <strong>${jenisLabel}</strong>
          <span class="riwayat-desk">${deskripsi}</span>
          <small>${waktuDibaca}</small>
        </div>
        <div class="riwayat-amount">
          <span class="nominal ${warnaNominal}">${tanda} Rp ${list.nominal.toLocaleString("id-ID")}</span>
          ${
            list.jenis === "transferMasuk"
              ? ""
              : `<button class="btn-tambah-fav" title="Simpan ke favorit">
                <i class="fa-regular fa-star"></i>
              </button>`
          }
        </div>
      </li>
    `;
  });

  listRiwayatUI.innerHTML =
    html ||
    `<li style="list-style-type: none; color: gray; font-size: 13px; font-weight: bold; font-style: italic;">Belum ada transaksi</li> `;
}

/** Menghapus transaksi favorit berdasarkan ID. */
function hapusListFavorit(id) {
  currentUser.favorit = currentUser.favorit.filter((fav) => fav.id !== id);
  renderFavorit();
  saveUsers();
}

// Menangani aksi hapus dan pakai lagi pada daftar favorit.
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
    } else if (selectedFavorit.jenis === "transferKeluarSamaBank") {
      inputIdTujuan.value = selectedFavorit.idUnikTujuan;
      inputNominalTransferSamaBank.value = selectedFavorit.nominal;
      showTransfer();
      showTransferSamaBank();
    } else if (selectedFavorit.jenis === "transferKeluarBedaBank") {
      inputBankWalletTujuan.value = selectedFavorit.tujuan;
      inputNoPenerimaTransfer.value = selectedFavorit.noPenerima;
      inputNamaPenerimaTransfer.value = selectedFavorit.namaPenerima;
      inputNominalTransferBedaBank.value = selectedFavorit.nominal;
      showTransfer();
      showTransferBedaBank();
    }
  }
});

const listRiwayatUI = document.querySelector("#listRiwayat");

// Menambahkan transaksi dari riwayat ke daftar favorit.
listRiwayatUI.addEventListener("click", (e) => {
  if (e.target.closest(".btn-tambah-fav")) {
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

      currentUser.favorit.unshift({
        id: `FAV-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
        jenis: transaksiTarget.jenis,
        nominal: transaksiTarget.nominal,
        lokTransaksi: transaksiTarget.bank || transaksiTarget.tempatTarik,
        idUnikTujuan: transaksiTarget.idUnikTujuan || "",
        tujuan: transaksiTarget.tujuan || "",
        noPenerima: transaksiTarget.noPenerima || "",
        namaPenerima: transaksiTarget.namaPenerima || "",
      });

      saveUsers();
      renderFavorit();
      showPopup("Berhasil ditambahkan ke favorit", "success");
    }
  }
});

/** Menampilkan pesan sementara dengan tipe success atau error. */
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

function cariProvider() {
  const nomor = nomorTelepon.value.trim().replace(/[\s-]/g, "")

  if(!nomor) {
    showPopup('Nomor telepon harus diisi!', 'error')
    return
  }

  if(!/^\d+$/.test(nomor)) {
    showPopup('Nomor telepon hanya boleh berisi angka!', 'error')
    return
  }

  if(nomor.length < 10 || nomor.length > 13) {
    showPopup('Panjang nomor tidak valid!', 'error')
    return
  }

  let selectedOperator = null
  
  for (const operator in prefixOperators) {
    if(prefixOperators[operator].some((prefix) => nomor.startsWith(prefix))) {
      selectedOperator = operator
      break
    }
  }

  outputPulsa.forEach((output) => {
    output.style.display = 'none'
  })

  if(!selectedOperator) {
    showPopup('Operator dari nomor tersebut tidak dikenali!', 'error')
    return
  }

  const outputOperator = document.querySelector(`#pulsa-${selectedOperator}`)
  outputOperator.querySelector('.nama-operator').textContent = `Operator: ${selectedOperator}`
  outputOperator.style.display = 'flex'
}

function beliPulsa() {
  const cardPulsa = event.target.closest('.card-pulsa')
  const nominal = Number(cardPulsa.dataset.nominal)
  const harga = Number(cardPulsa.dataset.harga)
  const operator = cardPulsa.closest('.output-pulsa').id.replace('pulsa-', '')

  if(!currentUser) {
    showPopup('Silahkan login terlebih dahulu!', 'error')
    return
  }

  if(harga > currentUser.saldo) {
    showPopup('Uang di saldomu kurang!', 'error')
    return
  }

  currentUser.saldo -= harga
  currentUser.riwayat.unshift({
    id: `HTR-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
    jenis: 'pulsa',
    nominal,
    harga,
    bank: `Pulsa ${namaOperator[operator]}`,
    nomorTujuan: nomorTelepon.value.trim(),
    waktu: Date.now()
  })

  updateUserUI()
  renderRiwayat()
  saveUsers()
  showPopup('Pembelian pulsa berhasil', 'success')
}

/** Menampilkan atau menyembunyikan indikator loading dan menonaktifkan kontrol login. */
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

/** Membuka halaman beranda. */
function showBeranda() {
  resetPageContentAll();
  resetPageSectionAll();
  resetJenisContentTransferAll()
  pageBeranda.style.display = "flex";
  btnBeranda.classList.add("active");
}

/** Membuka halaman transaksi favorit. */
function showFavorit() {
  resetPageContentAll();
  resetPageSectionAll();
  resetJenisContentTransferAll()
  pageFavorit.style.display = "flex";
  btnFavorit.classList.add("active");
}

/** Membuka halaman riwayat transaksi. */
function showRiwayat() {
  resetPageContentAll();
  resetPageSectionAll();
  resetJenisContentTransferAll()
  pageRiwayat.style.display = "flex";
  btnRiwayat.classList.add("active");
}

/** Membuka halaman profil pengguna. */
function showProfil() {
  resetPageContentAll();
  resetPageSectionAll();
  resetJenisContentTransferAll()
  pageProfil.style.display = "flex";
  btnProfil.classList.add("active");
}

/** Membuka section transfer. */
function showTransfer() {
  resetPageContentAll();
  resetPageSectionAll();
  pageTransfer.style.display = "flex";
}

/** Membuka section paket data. */
function showPaketData() {
  resetPageContentAll();
  resetPageSectionAll();
  pagePaketData.style.display = "flex";
}

/** Membuka section pulsa. */
function showPulsa() {
  resetPageContentAll();
  resetPageSectionAll();
  pagePulsa.style.display = "flex";
}

/** Membuka section pembayaran PLN. */
function showPLN() {
  resetPageContentAll();
  resetPageSectionAll();
  pagePLN.style.display = "flex";
}

/** Membuka section top up game. */
function showTopUpGame() {
  resetPageContentAll();
  resetPageSectionAll();
  pageGame.style.display = "flex";
}

/** Membuka section transportasi. */
function showTransportasi() {
  resetPageContentAll();
  resetPageSectionAll();
  pageTransportasi.style.display = "flex";
}

/** Menampilkan form transfer sesama bank. */
function showTransferSamaBank() {
  resetJenisContentTransferAll();
  contentTransferSamaBank.style.display = "flex";
  btnTransferSamaBank.classList.add("btn-tujuan-active");
}

/** Menampilkan form transfer beda bank atau wallet lain. */
function showTransferBedaBank() {
  resetJenisContentTransferAll();
  contentTransferBedaBank.style.display = "flex";
  btnTransferBedaBank.classList.add("btn-tujuan-active");
}

btnLogin.addEventListener("click", login);
btnDaftar.addEventListener("click", daftar);

// Berpindah dari form login ke form pendaftaran.
btnPindahDaftar.addEventListener("click", () => {
  formLogin.style.display = "none";
  formDaftar.style.display = "flex";
});

// Berpindah dari form pendaftaran ke form login.
btnPindahLogin.addEventListener("click", () => {
  formDaftar.style.display = "none";
  formLogin.style.display = "flex";
});

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

cariNomor.addEventListener('click', cariProvider)

outputPulsa.forEach((output) => {
  output.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-beli-pulsa')) {
      beliPulsa(event)
    }
  })
})


btnTransferSamaBank.addEventListener("click", showTransferSamaBank);
btnTransferBedaBank.addEventListener("click", showTransferBedaBank);

transferSamaBtn.addEventListener("click", funcTransferSamaBank);
transferBedaBtn.addEventListener("click", funcTransferBedaBank);
btnKonfirmasiTransferSamaBank.addEventListener(
  "click",
  konfirmasiTransferSamaBank,
);
btnKonfirmasiTransferBedaBank.addEventListener(
  "click",
  konfirmasiTransferBedaBank,
);
btnBatalTransferSamaBank.addEventListener("click", batalTransfer);
btnBatalTransferBedaBank.addEventListener("click", batalTransfer);

// Menghapus sesi aktif dan mengembalikan pengguna ke halaman login.
logoutBtn.addEventListener("click", () => {
  currentUser = null;
  container.style.display = "none";
  containerLoginDaftar.style.display = "flex";
  inputNamaLogin.value = "";
  inputPasswordLogin.value = "";
  showPopup("Berhasil logout", "success");
});

getUsers();
