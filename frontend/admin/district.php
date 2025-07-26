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
        <?php
        $pageTitle = 'District Management';
        $breadcrumb = ['Home', 'Location Directory', 'District'];
        include '../components/breadcum.php';
        ?>

     
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
          <th style="padding: 16px 12px; text-align: center; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Actions</th>
        </tr>
      </thead>
      <tbody id="districtTable" style="font-size: 0.95rem;"></tbody>
    </table>
  </div>
</div>

<!-- Edit District Modal -->
<div id="editDistrictModal" class="modal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.3); align-items:center; justify-content:center; z-index:9999;">
  <div class="modal-content" style="background:#fff; padding:32px 28px; border-radius:12px; max-width:500px; width:100%; position:relative;">
    <span id="closeEditDistrictModal" style="position:absolute; top:12px; right:18px; font-size:1.5rem; cursor:pointer;">&times;</span>
    <h2 style="margin-top:0; color:#2563eb; font-size:1.5rem; margin-bottom:18px;">Edit District</h2>
    <form id="editDistrictForm" enctype="multipart/form-data" style="display:flex; flex-direction:column; gap:18px;">
      <input type="hidden" name="id" id="editDistrictId" />
      <div>
        <label style="font-weight:600; color:#374151; margin-bottom:8px; display:block; font-size:0.95rem;">District Name:</label>
        <input type="text" name="districtName" id="editDistrictName" required style="width:100%; padding:10px 14px; border-radius:8px; border:2px solid #e5e7eb; font-size:1rem;" />
      </div>
      <div>
        <label style="font-weight:600; color:#374151; margin-bottom:8px; display:block; font-size:0.95rem;">Country:</label>
        <select name="country" id="editDistrictCountry" class="custom-select" required></select>
      </div>
      <div>
        <label style="font-weight:600; color:#374151; margin-bottom:8px; display:block; font-size:0.95rem;">State:</label>
        <select name="state" id="editDistrictState" class="custom-select" required></select>
      </div>
      <div style="display:flex; gap:12px; margin-top:10px;">
        <button type="submit" style="background:#2563eb; color:#fff; border:none; border-radius:8px; padding:12px 28px; font-size:1.1rem; font-weight:600; cursor:pointer;">Save</button>
        <button type="button" id="cancelEditDistrictBtn" style="background:#6b7280; color:#fff; border:none; border-radius:8px; padding:12px 28px; font-size:1.1rem; font-weight:600; cursor:pointer;">Cancel</button>
      </div>
    </form>
  </div>
</div>

<!-- JS Scripts -->
<script src="../js/script.js"></script>
<script src="../js/common.js"></script>
<script src="../js/district.js"></script>
</body>
</html>
