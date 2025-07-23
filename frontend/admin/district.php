<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>State Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
      <?php include '../components/district-header.php'; ?>
    <!-- Country management content (form/list) -->
    <div class="main-container" style="max-width: 900px; margin: 0 auto;">
      <div class="top-btns" style="display: flex; gap: 12px; margin-bottom: 24px;">
        <button id="showFormBtn" class="main-btn" style="background: #2563eb; color: #fff; border: none; border-radius: 6px; padding: 10px 22px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 8px rgba(37,99,235,0.08); transition: background 0.2s;">
          <span>➕</span> Add Record
        </button>
        <button id="showListBtn" class="main-btn" style="background: #22d3a7; color: #fff; border: none; border-radius: 6px; padding: 10px 22px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 8px rgba(34,211,167,0.08); transition: background 0.2s;">
          <span>📋</span> Record List
        </button>
      </div>
<!-- District Form -->
<div class="form-container" id="districtFormDiv" style="display: none; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); padding: 32px 28px; margin-bottom: 32px;">
  <h2 style="margin-top: 0; color: #2563eb; font-size: 1.8rem; margin-bottom: 24px;">Add District</h2>
  <form id="districtForm" enctype="multipart/form-data" style="display: flex; flex-direction: column; gap: 20px;">
    
    <!-- Country & State Dropdowns -->
    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 250px;">
        <label style="font-weight: 700; color: #374151; margin-bottom: 8px; display: block;">Country Name<span style="color: red;">*</span></label>
        <select name="country" id="districtCountryDropdown" class="custom-select" required>
          <option value="">-- Select Country --</option>
        </select>
      </div>
      <div style="flex: 1; min-width: 250px;">
        <label style="font-weight: 700; color: #374151; margin-bottom: 8px; display: block;">State Name<span style="color: red;">*</span></label>
        <select name="state" id="districtStateDropdown" class="custom-select" required>
          <option value="">-- Select State --</option>
        </select>
      </div>
    </div>

    <!-- District Name Input -->
    <div>
      <label style="font-weight: 700; color: #374151; margin-bottom: 8px; display: block;">District Name<span style="color: red;">*</span></label>
      <input type="text" name="districtName" placeholder="Enter district name" required
        style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 1rem; box-sizing: border-box;" />
    </div>

    <!-- Buttons -->
    <div style="display: flex; gap: 12px; margin-top: 10px;">
      <button type="submit" style="background: #2563eb; color: #fff; border: none; border-radius: 8px; padding: 14px 32px; font-size: 1.1rem; font-weight: 600; cursor: pointer;">Submit</button>
      <button type="reset" style="background: #6b7280; color: #fff; border: none; border-radius: 8px; padding: 14px 32px; font-size: 1.1rem; font-weight: 600; cursor: pointer;">Reset</button>
    </div>
  </form>
</div>

<!-- District List (initially visible) -->
<div class="list-container" id="districtListDiv" style="display: block; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); padding: 32px 28px;">
  <h2 style="margin-top: 0; color: #2563eb; font-size: 1.8rem; margin-bottom: 24px;">District List</h2>
  <div style="overflow-x: auto;">
    <table class="state-table" style="width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.03); min-width: 800px;">
      <thead>
        <tr style="background: #f8fafc; color: #374151;">
          <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">#</th>
          <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">District Name</th>
          <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">State</th>
          <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Country</th>
        </tr>
      </thead>
      <tbody id="districtTable" style="font-size: 0.95rem;"></tbody>
    </table>
  </div>
</div>

<!-- JS Scripts -->
<script src="../js/script.js"></script>
<script src="../js/district.js"></script>
<script>
// Show/hide form and list on button clicks
const showFormBtn = document.getElementById('showFormBtn');
const showListBtn = document.getElementById('showListBtn');
const formDiv = document.getElementById('districtFormDiv');
const listDiv = document.getElementById('districtListDiv');
if (showFormBtn && showListBtn && formDiv && listDiv) {
  showFormBtn.addEventListener('click', function () {
    formDiv.style.display = 'block';
    listDiv.style.display = 'none';
  });
  showListBtn.addEventListener('click', function () {
    formDiv.style.display = 'none';
    listDiv.style.display = 'block';
  });
}
</script>
</body>
</html>
