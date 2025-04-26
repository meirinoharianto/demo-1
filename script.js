let currentUser = '';
let currentRole = '';
let dataList = [];

let currentUserRole = '';  // Role user saat ini

function login(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Login sederhana dengan hardcoded username/password
  if (username === 'admin' && password === 'admin') {
    currentUserRole = 'admin'; // Role admin
    showPage('dashboard');
    showMenuForRole();
  } else if (username === 'teknisi' && password === 'teknisi') {
    currentUserRole = 'teknisi'; // Role teknisi
    showPage('report');
    showMenuForRole();
  } else {
    alert('Username atau Password salah!');
  }
}

function showMenuForRole() {
  if (currentUserRole === 'admin') {
    document.getElementById('menuPerformance').classList.remove('d-none');
    document.getElementById('menuForm').classList.remove('d-none');
    document.getElementById('menuReport').classList.remove('d-none');
  } else {
    document.getElementById('menuPerformance').classList.add('d-none');
  }
  document.getElementById('menuLogout').classList.remove('d-none');
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}

function logout() {
  currentUserRole = '';
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
  document.getElementById('menuPerformance').classList.add('d-none');
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
    if (!teknisiData[teknisi]) {
      teknisiData[teknisi] = { total: 0, completed: 0, inProgress: 0 };
    }
    teknisiData[teknisi].total++;
    if (data.status === "Completed") {
      teknisiData[teknisi].completed++;
    } else {
      teknisiData[teknisi].inProgress++;
    }
  });

  const tableBody = document.getElementById("performanceTable");
  tableBody.innerHTML = Object.keys(teknisiData).map(teknisi => `
    <tr>
      <td>${teknisi}</td>
      <td>${teknisiData[teknisi].total}</td>
      <td>${teknisiData[teknisi].completed}</td>
      <td>${teknisiData[teknisi].inProgress}</td>
    </tr>
  `).join('');
}

function showDetail(index) {
  const d = dataList[index];
  let buttonsHtml = '';

  if (d.status === "Menunggu Pickup") {
    buttonsHtml = `
      <button class="btn btn-primary" onclick="pickup(${index})">Pickup</button>
      <button class="btn btn-secondary" onclick="cancel(${index})">Batal</button>
    `;
  } else if (d.status === "Picked Up") {
    buttonsHtml = `
      <button class="btn btn-warning" onclick="backToHO(${index})">Back to HO</button>
      <button class="btn btn-success" onclick="complete(${index})">Completed</button>
    `;
  } else if (d.status === "Back to HO") {
    buttonsHtml = `
      <button class="btn btn-success" onclick="complete(${index})">Completed</button>
    `;
  }

  document.getElementById('detailContent').innerHTML = `
    <p><strong>No WO:</strong> ${d.wo}</p>
    <p><strong>Nomor Tiket:</strong> ${d.tiket}</p>
    <p><strong>Tanggal Laporan:</strong> ${d.tglLaporan}</p>
    <p><strong>Status:</strong> ${d.status}</p>
    ${buttonsHtml}
  `;
  showPage('detail');
}
