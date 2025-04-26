let currentUser = '';
let currentRole = '';
let dataList = [];

function login(e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "admin") {
    currentUser = "admin";
    currentRole = "admin";
  } else if (user === "teknisi" && pass === "teknisi") {
    currentUser = "teknisi";
    currentRole = "teknisi";
  } else {
    alert("Username atau password salah!");
    return;
  }

  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  // Sembunyikan/Perlihatkan menu berdasarkan role
  if (currentRole === "teknisi") {
    document.getElementById("menuDashboard").style.display = "none";
    document.getElementById("menuForm").style.display = "none";
    showPage('report');
  } else {
    showPage('dashboard');
    document.getElementById("menuPerformance").classList.remove("d-none");
  }

  document.getElementById("menuLogout").classList.remove("d-none");
}

function logout() {
  currentUser = "";
  currentRole = "";
  document.getElementById("app").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
  document.getElementById("menuLogout").classList.add("d-none");
}

function submitForm(e) {
  e.preventDefault();
  const data = {
    wo: document.getElementById('wo').value,
    tiket: document.getElementById('tiket').value,
    tglLaporan: document.getElementById('tglLaporan').value,
    inet: document.getElementById('inet').value,
    kategori: document.getElementById('kategori').value,
    nama: document.getElementById('nama').value,
    alamat: document.getElementById('alamat').value,
    hp: document.getElementById('hp').value,
    keluhan: document.getElementById('keluhan').value,
    status: "Menunggu Pickup", // Status awal
    ttr: document.getElementById('ttr').value,
    pickup: document.getElementById('pickup').value,
    completed: document.getElementById('completed').value,
    keterangan: document.getElementById('keterangan').value,
    teknisi: document.getElementById('teknisi').value
  };
  dataList.push(data);
  alert("Data berhasil disimpan!");
  showPage('report');
  updateReport();
}

function showPage(page) {
  document.querySelectorAll('.content').forEach(page => page.classList.add('hidden'));
  document.getElementById(page + 'Page').classList.remove('hidden');
}

function updateReport() {
  const tableBody = document.getElementById("reportTable");
  tableBody.innerHTML = dataList.map((data, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${data.wo}</td>
      <td>${data.tiket}</td>
      <td>${data.tglLaporan}</td>
      <td>${data.status}</td>
      <td><button class="btn btn-info" onclick="showDetail(${index})">Detail</button></td>
    </tr>
  `).join('');
}

function updatePerformance() {
  const teknisiData = {};

  // Menghitung jumlah WO per teknisi dan statusnya
  dataList.forEach(data => {
    const teknisi = data.teknisi;
    if (!teknisiData[te
