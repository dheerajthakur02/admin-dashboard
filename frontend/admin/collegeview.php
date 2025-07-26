<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>College View</title>
  <link href="../style.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
      <div class="main page-transition">
        <?php
        $pageTitle = 'College View';
        $breadcrumb = ['Home', 'College Master', 'College View'];
        include '../components/breadcum.php';
        ?>
    <!-- Country management content (form/list) -->
    <div class="main-container" style="max-width: 900px; margin: 0 auto;">
      <div class="top-btns" style="display: flex; gap: 12px; margin-bottom: 24px;">
        <button id="addRecordBtn" style="background: #14b8a6; color: #fff; border: none; border-radius: 6px; padding: 12px 28px; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <i class="fa fa-plus"></i> Add Record
        </button>
        <button id="recordListBtn" style="background: #14b8a6; color: #fff; border: none; border-radius: 6px; padding: 12px 28px; font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <i class="fa fa-list"></i> Record List
        </button>
      </div>
      <div style="margin-bottom: 24px;">
        <label for="collegeSelect" style="font-weight: 700; font-size: 1.1rem; color: #232b35; margin-bottom: 8px; display: block;">College Name * :</label>
        <select id="collegeSelect" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;">
          <option value="">Select College</option>
        </select>
      </div>
      <div id="collegeInfo" style="font-weight: bold; font-size: 1.15rem; color: #232b35; margin-top: 8px;"></div>
      <script>
        document.addEventListener('DOMContentLoaded', async function() {
          const baseUrl = window.baseUrl || "http://localhost:4000/api";
          const select = document.getElementById('collegeSelect');
          const infoDiv = document.getElementById('collegeInfo');
          let colleges = [];
          try {
            colleges = await apiRequest(`${baseUrl}/college/all-colleges`);
            if (Array.isArray(colleges)) {
              colleges.forEach(c => {
                const opt = document.createElement('option');
                opt.value = c._id;
                opt.textContent = c.name + (c.status === 'added' ? ' - [Added]' : '');
                select.appendChild(opt);
              });
            }
          } catch (err) {}
          select.addEventListener('change', function() {
            const selected = colleges.find(c => c._id === select.value);
            if (selected) {
              infoDiv.innerHTML = `${selected.name || ''}${selected.address ? ', ' + selected.address : ''}`;
            } else {
              infoDiv.innerHTML = '';
            }
          });
        });
      </script>
      <!-- Country Form -->
      <div class="form-container" id="formDiv" style="display: none; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); padding: 32px 28px; margin-bottom: 32px;">
        <h2 style="margin-top: 0; color: #2563eb; font-size: 1.8rem; margin-bottom: 24px;">Add Country</h2>
        <form id="countryForm" enctype="multipart/form-data" style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 600; color: #374151; margin-bottom: 8px; display: block; font-size: 0.95rem;">Country Name:</label>
              <input type="text" name="name" required placeholder="Enter country name" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 1rem; transition: border-color 0.2s; box-sizing: border-box;" />
            </div>
            <div style="flex: 1; min-width: 200px;">
              <label style="font-weight: 600; color: #374151; margin-bottom: 8px; display: block; font-size: 0.95rem;">Country Code:</label>
              <input type="text" name="code" required placeholder="e.g., US, IN, UK" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 1rem; transition: border-color 0.2s; box-sizing: border-box;" />
            </div>
          </div>
          <div>
            <label style="font-weight: 600; color: #374151; margin-bottom: 8px; display: block; font-size: 0.95rem;">Description:</label>
            <textarea name="description" required rows="4" placeholder="Enter country description" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 1rem; transition: border-color 0.2s; box-sizing: border-box; resize: vertical; min-height: 100px;"></textarea>
          </div>
          <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 600; color: #374151; margin-bottom: 8px; display: block; font-size: 0.95rem;">Country Logo:</label>
              <input type="file" name="logo" accept="image/*" style="width: 100%; padding: 8px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 0.95rem; transition: border-color 0.2s; box-sizing: border-box;" />
            </div>
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 600; color: #374151; margin-bottom: 8px; display: block; font-size: 0.95rem;">Country Flag:</label>
              <input type="file" name="flag" accept="image/*" style="width: 100%; padding: 8px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 0.95rem; transition: border-color 0.2s; box-sizing: border-box;" />
            </div>
          </div>
          <div style="display: flex; gap: 12px; margin-top: 10px;">
            <button type="submit" style="background: #2563eb; color: #fff; border: none; border-radius: 8px; padding: 14px 32px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s; min-width: 120px;">Submit</button>
            <button type="button" onclick="document.getElementById('showListBtn').click()" style="background: #6b7280; color: #fff; border: none; border-radius: 8px; padding: 14px 32px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s; min-width: 120px;">Cancel</button>
          </div>
        </form>
      </div>

      <!-- Remove the Country List table and related HTML. -->
      <!-- Edit Country Modal -->
      <div id="editCountryModal" class="modal" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.3); align-items:center; justify-content:center; z-index:9999;">
        <div class="modal-content" style="background:#fff; padding:32px 28px; border-radius:12px; max-width:500px; width:100%; position:relative;">
          <span id="closeEditModal" style="position:absolute; top:12px; right:18px; font-size:1.5rem; cursor:pointer;">&times;</span>
          <h2 style="margin-top:0; color:#2563eb; font-size:1.5rem; margin-bottom:18px;">Edit Country</h2>
          <form id="editCountryForm" enctype="multipart/form-data" style="display:flex; flex-direction:column; gap:18px;">
            <input type="hidden" name="id" id="editCountryId" />
            <div>
              <label style="font-weight:600; color:#374151; margin-bottom:8px; display:block; font-size:0.95rem;">Country Name:</label>
              <input type="text" name="name" id="editCountryName" required style="width:100%; padding:10px 14px; border-radius:8px; border:2px solid #e5e7eb; font-size:1rem;" />
            </div>
            <div>
              <label style="font-weight:600; color:#374151; margin-bottom:8px; display:block; font-size:0.95rem;">Country Code:</label>
              <input type="text" name="code" id="editCountryCode" required style="width:100%; padding:10px 14px; border-radius:8px; border:2px solid #e5e7eb; font-size:1rem;" />
            </div>
            <div>
              <label style="font-weight:600; color:#374151; margin-bottom:8px; display:block; font-size:0.95rem;">Description:</label>
              <textarea name="description" id="editCountryDescription" required rows="3" style="width:100%; padding:10px 14px; border-radius:8px; border:2px solid #e5e7eb; font-size:1rem;"></textarea>
            </div>
            <div>
              <label style="font-weight:600; color:#374151; margin-bottom:8px; display:block; font-size:0.95rem;">Country Logo:</label>
              <input type="file" name="logo" id="editCountryLogo" accept="image/*" />
            </div>
            <div>
              <label style="font-weight:600; color:#374151; margin-bottom:8px; display:block; font-size:0.95rem;">Country Flag:</label>
              <input type="file" name="flag" id="editCountryFlag" accept="image/*" />
            </div>
            <div style="display:flex; gap:12px; margin-top:10px;">
              <button type="submit" style="background:#2563eb; color:#fff; border:none; border-radius:8px; padding:12px 28px; font-size:1.1rem; font-weight:600; cursor:pointer;">Save</button>
              <button type="button" id="cancelEditBtn" style="background:#6b7280; color:#fff; border:none; border-radius:8px; padding:12px 28px; font-size:1.1rem; font-weight:600; cursor:pointer;">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <?php include '../components/footer.php'; ?>
    </div>
    <script src="../js/script.js"></script>
    <script src="../js/dashboard.js"></script>
    <script src="../js/common.js"></script>
    <script src="../js/country.js"></script>
    <script>
document.getElementById('addRecordBtn').addEventListener('click', function() {
  window.location.href = 'addcollege.php';
});
</script>
  </body>
</html>