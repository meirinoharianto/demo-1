// Variabel untuk menyimpan informasi pengguna saat ini
let currentUserRole = '';  // Role user saat ini

// Fungsi untuk login pengguna
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

// Menampilkan halaman berdasarkan role
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

// Logout dari aplikasi
function logout() {
  currentUserRole = '';
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('app').classList.add('hidden');
  document.getElementById('menuPerformance').classList.add('d-none');
}

// Fungsi untuk menampilkan halaman tertentu
function showPage(page) {
  const pages = ['dashboard', 'form', 'report', 'performance', 'detail'];
  pages.forEach(p => {
    document.getElementById(p + 'Page').classList.add('hidden');
  });

  document.getElementById(page + 'Page').classList.remove('hidden');
}

// Fungsi untuk memproses Bulk Import
function openBulkImport() {
  document.getElementById('bulkImportFile').click(); // Menampilkan file input
}

// Fungsi untuk menangani file yang diupload
function handleBulkImport(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const content = e.target.result;
      processBulkImport(content);
    };
    reader.readAsText(file); // Membaca file sebagai teks (CSV)
  }
}

// Fungsi untuk memproses dan menampilkan data dari file CSV
function processBulkImport(content) {
  const lines = content.split('\n');
  const table = document.getElementById('reportTable');
  
  lines.forEach((line, index) => {
    if (line) {
      const data = line.split(',');
      const row = table.insertRow();
      data.forEach((cell, cellIndex) => {
        const newCell = row.insertCell(cellIndex);
        newCell.textContent = cell.trim();
      });
      // Tambahkan tombol aksi (misalnya lihat detail)
      const actionCell = row.insertCell(data.length);
      actionCell.innerHTML = `<button class="btn btn-sm btn-primary" onclick="viewDetails(${index})">Detail</button>`;
    }
  });
}

// Fungsi untuk melihat detail dari WO yang dipilih
function viewDetails(index) {
  alert('Detail untuk baris ' + index);
  // Anda bisa menampilkan data lebih lanjut berdasarkan baris yang dipilih
}

// Fungsi untuk mengubah status WO
function updateStatusWO(status, rowIndex) {
  const row = document.getElementById('reportTable').rows[rowIndex];
  const statusCell = row.cells[4]; // Kolom status
  
  // Ubah status dan sesuaikan tombol berdasarkan status
  statusCell.textContent = status;
  const actionCell = row.cells[row.cells.length - 1];
  actionCell.innerHTML = '';

  if (status === 'picked up') {
    actionCell.innerHTML = `
      <button class="btn btn-sm btn-secondary" onclick="updateStatusWO('back to HO', ${rowIndex})">Back to HO</button>
      <button class="btn btn-sm btn-success" onclick="updateStatusWO('completed', ${rowIndex})">Completed</button>
    `;
  } else if (status === 'back to HO') {
    actionCell.innerHTML = `
      <button class="btn btn-sm btn-success" onclick="updateStatusWO('completed', ${rowIndex})">Completed</button>
    `;
  } else if (status === 'completed') {
    actionCell.innerHTML = `<span class="badge badge-success">Completed</span>`;
  }
}

// Fungsi untuk mengubah tampilan halaman yang aktif
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('d-none');
}

// Menangani form data WO
function submitForm(e) {
  e.preventDefault();
  // Ambil data dari form input
  const wo = document.getElementById('wo').value;
  const tiket = document.getElementById('tiket').value;
  const tglLaporan = document.getElementById('tglLaporan').value;
  const inet = document.getElementById('inet').value;
  const kategori = document.getElementById('kategori').value;
  const nama = document.getElementById('nama').value;
  const alamat = document.getElementById('alamat').value;
  const hp = document.getElementById('hp').value;
  const keluhan = document.getElementById('keluhan').value;
  const status = document.getElementById('status').value;
  const ttr = document.getElementById('ttr').value;
  const pickup = document.getElementById('pickup').value;
  const completed = document.getElementById('completed').value;
  const keterangan = document.getElementById('keterangan').value;
  const teknisi = document.getElementById('teknisi').value;

  // Proses data dan masukkan ke dalam tabel laporan
  const table = document.getElementById('reportTable');
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${table.rows.length}</td>
    <td>${wo}</td>
    <td>${tiket}</td>
    <td>${tglLaporan}</td>
    <td>${status}</td>
    <td><button class="btn btn-sm btn-primary" onclick="viewDetails(${table.rows.length - 1})">Detail</button></td>
  `;

  // Reset form setelah data disubmit
  document.querySelector('form').reset();
  showPage('report'); // Kembali ke halaman Daftar WO
}

// Menampilkan halaman laporan performa teknisi untuk role admin
function showPerformanceReport() {
  if (currentUserRole !== 'admin') {
    alert('Anda tidak memiliki akses ke laporan ini.');
    return;
  }

  // Ambil data performa teknisi dan tampilkan dalam tabel
  const table = document.getElementById('performanceTable');
  table.innerHTML = `
    <tr>
      <td>Teknisi 1</td>
      <td>100</td>
      <td>95</td>
      <td>5</td>
    </tr>
    <tr>
      <td>Teknisi 2</td>
      <td>120</td>
      <td>110</td>
      <td>10</td>
    </tr>
  `;
  showPage('performance');
}

// Panggil fungsi showPerformanceReport jika halaman performa teknisi yang dituju
if (currentUserRole === 'admin') {
  showPerformanceReport();
}
