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
      $pageTitle = 'Add College';
      $breadcrumb = ['Home', 'College Master', 'Add College'];
      include '../components/breadcum.php';
      ?>
    <!-- Country management content (form/list) -->
    <div class="main-container" style="max-width: 1200px; margin: 0 auto;">
      <div class="top-btns" style="display: flex; gap: 12px; margin-bottom: 24px;">
        <button id="showFormBtn" class="main-btn" style="background: #2563eb; color: #fff; border: none; border-radius: 6px; padding: 10px 22px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 8px rgba(37,99,235,0.08); transition: background 0.2s;">
          <span>➕</span> Add Record
        </button>
        <button id="showListBtn" class="main-btn" style="background: #22d3a7; color: #fff; border: none; border-radius: 6px; padding: 10px 22px; font-size: 1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 8px rgba(34,211,167,0.08); transition: background 0.2s;">
          <span>📋</span> Record List
        </button>
      </div>
      <div id="collegeFormDiv" style="display: none;">
        <form id="addCollegeForm" enctype="multipart/form-data" style="background: #fff; border-radius: 14px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); padding: 32px 28px; display: flex; flex-direction: column; gap: 24px;">
          <div style="display: flex; gap: 24px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Stream *</label>
              <select name="stream" required style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;">
                <option value="">-- Select --</option>
              </select>
            </div>
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Course Name :</label>
              <select name="course" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;">
                <option value="">-- Select --</option>
              </select>
            </div>
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Exam Name *</label>
              <select name="examName" required style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;">
                <option value="">-- Select --</option>
              </select>
            </div>
          </div>
          <!-- College Logo, Banner, Brochure Section -->
          <div style="display: flex; gap: 24px; flex-wrap: wrap; margin-top: 24px;">
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">College Logo :</label>
              <input type="file" name="collegeLogo" id="collegeLogoInput" accept="image/*" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
              <div style="margin-top: 8px; border: 1px solid #e5e7eb; border-radius: 6px; min-height: 100px; background: #fafbfc; display: flex; align-items: center; justify-content: center;">
                <img id="collegeLogoPreview" src="" alt="" style="max-width: 100%; max-height: 100px; display: block; margin: 0 auto;" onerror="this.style.display='none'" />
              </div>
            </div>
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">College Banner :</label>
              <input type="file" name="collegeBanner" id="collegeBannerInput" accept="image/*" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
              <div style="margin-top: 8px; border: 1px solid #e5e7eb; border-radius: 6px; min-height: 100px; background: #fafbfc; display: flex; align-items: center; justify-content: center;">
                <img id="collegeBannerPreview" src="" alt="" style="max-width: 100%; max-height: 100px; display: block; margin: 0 auto;" onerror="this.style.display='none'" />
              </div>
            </div>
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">College Brochure :</label>
              <input type="file" name="collegeBrochure" id="collegeBrochureInput" accept="image/*,application/pdf" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
              <div style="margin-top: 8px; border: 1px solid #e5e7eb; border-radius: 6px; min-height: 100px; background: #fafbfc; display: flex; align-items: center; justify-content: center;">
                <img id="collegeBrochurePreview" src="" alt="" style="max-width: 100%; max-height: 100px; display: block; margin: 0 auto;" onerror="this.style.display='none'" />
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 24px; flex-wrap: wrap;">
            <div style="flex: 2; min-width: 250px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Title :</label>
              <input type="text" name="title" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
            </div>
            <div style="flex: 1; min-width: 180px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Display Rank (Optional):</label>
              <input type="number" name="displayRank" min="0" value="0" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
            </div>
          </div>
          <div style="display: flex; gap: 24px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">No of Application :</label>
              <input type="text" name="noOfApplication" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
            </div>
            <div style="flex: 1; min-width: 250px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Purpose :</label>
              <input type="text" name="purpose" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
            </div>
            <div style="flex: 1; min-width: 180px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Application Fee :</label>
              <input type="number" name="applicationFee" min="0" value="0" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
            </div>
          </div>
          <div style="display: flex; gap: 24px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 200px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Application Date :</label>
              <input type="date" name="applicationDate" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
            </div>
            <div style="flex: 1; min-width: 200px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Exam Date :</label>
              <input type="date" name="examDate" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
            </div>
            <div style="flex: 1; min-width: 200px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Result Date :</label>
              <input type="date" name="resultDate" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
            </div>
            <div style="flex: 1; min-width: 200px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Exam Level * :</label>
              <select name="examLevel" required style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;">
                <option value="">-- Select --</option>
              </select>
            </div>
          </div>
          <div style="display: flex; gap: 24px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 200px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Exam Type :</label>
              <select name="examType" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;">
                <option value="">-- Select --</option>
              </select>
            </div>
            <div style="flex: 1; min-width: 200px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">State * :</label>
              <select name="state" required style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;">
                <option value="">-- Select --</option>
              </select>
            </div>
            <div style="flex: 1; min-width: 200px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Upload Logo :</label>
              <input type="file" name="logo" accept="image/*" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
            </div>
            <div style="flex: 1; min-width: 200px;">
              <label style="font-weight: 700; color: #232b35; margin-bottom: 8px; display: block;">Upload PDF :</label>
              <input type="file" name="pdf" accept="application/pdf" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1rem;" />
            </div>
          </div>
          <div style="display: flex; gap: 16px; margin-top: 18px;">
            <button type="submit" style="background: #2563eb; color: #fff; border: none; border-radius: 8px; padding: 14px 32px; font-size: 1.1rem; font-weight: 600; cursor: pointer;">Submit</button>
            <button type="reset" style="background: #6b7280; color: #fff; border: none; border-radius: 8px; padding: 14px 32px; font-size: 1.1rem; font-weight: 600; cursor: pointer;">Reset</button>
          </div>
        </form>
      </div>
      <div id="collegeListDiv" style="display: block;">
        <h2 style="margin-top: 0; color: #2563eb; font-size: 1.8rem; margin-bottom: 24px;">College List</h2>
        <div style="overflow-x: auto;">
          <table class="state-table" style="width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.03); min-width: 800px;">
            <thead>
              <tr style="background: #f8fafc; color: #374151;">
                <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">#</th>
                <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">College Name</th>
                <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">District</th>
                <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">State</th>
                <th style="padding: 16px 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Country</th>
                <th style="padding: 16px 12px; text-align: center; font-weight: 600; border-bottom: 2px solid #e5e7eb;">Actions</th>
              </tr>
            </thead>
            <tbody id="collegeTable" style="font-size: 0.95rem;"></tbody>
          </table>
        </div>
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
<script src="../js/common.js"></script>
<script src="../js/addcollege.js"></script>
</body>
</html>

