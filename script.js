let currentUser = '';
let currentRole = '';
let dataList = [];

function login(e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // Cek role
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

  // Default tampilkan semua menu
  document.querySelectorAll('.sidebar a, .bottom-menu a').forEach(a => {
    a.style.display = "block";
  });

  // Sembunyikan menu untuk teknisi (hanya tampilkan laporan & logout)
  if (currentRole === "teknisi") {
    document.getElementById("menuDashboard").style.display = "none";
    document.getElementById("menuForm").style.display = "none";
    showPage('report');
  } else {
    showPage('dashboard');
  }

  // Pastikan menu logout selalu tampil
  document.getElementById("menuLogout").classList.remove("d-none");
}

function logout() {
  currentUser = "";
  currentRole = "";

  // Reset UI
  document.getElementById("app").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");

  // Tampilkan kembali semua menu
  document.querySelectorAll('.sidebar a, .bottom-menu a').forEach(a => {
    a.style.display = "block";
  });

  // Sembunyikan logout khusus teknisi
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
    status: document.getElementById('status').value,
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
      <td>${data.inet}</td>
      <td>${data.kategori}</td>
      <td>${data.nama}</td>
      <td>${data.alamat}</td>
      <td>${data.hp}</td>
      <td>${data.keluhan}</td>
      <td>${data.status}</td>
      <td>${data.ttr}</td>
      <td>${data.pickup}</td>
      <td>${data.completed}</td>
      <td>${data.keterangan}</td>
      <td>${data.teknisi}</td>
      <td><button class="btn btn-info" onclick="showDetail(${index})">Detail</button></td>
    </tr>
  `).join('');
}

function showDetail(index) {
  const d = dataList[index];
  document.getElementById('detailContent').innerHTML = `
    <p><strong>No WO:</strong> ${d.wo}</p>
    <p><strong>Nomor Tiket:</strong> ${d.tiket}</p>
    <p><strong>Tanggal Laporan:</strong> ${d.tglLaporan}</p>
    <p><strong>Nama:</strong> ${d.nama}</p>
    <p><strong>Alamat:</strong> ${d.alamat}</p>
    <p><strong>Keluhan:</strong> ${d.keluhan}</p>
    <p><strong>Status:</strong> ${d.status}</p>
    <button class="btn btn-primary" onclick="markPickedUp(${index})">Pickup</button>
    <button class="btn btn-warning" onclick="backToHO(${index})">Back to HO</button>
    <button class="btn btn-success" onclick="markCompleted(${index})">Completed</button>
  `;
  showPage('detail');
}

function markPickedUp(index) {
  dataList[index].status = "Picked Up";
  alert("WO diambil oleh teknisi.");
  updateReport();
}

function backToHO(index) {
  dataList[index].status = "Back to HO";
  alert("WO dikembalikan ke HO.");
  updateReport();
}

function markCompleted(index) {
  dataList[index].status = "Completed";
  alert("WO ditandai sebagai selesai.");
  updateReport();
}
