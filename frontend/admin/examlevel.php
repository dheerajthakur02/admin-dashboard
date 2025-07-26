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
      $pageTitle = 'Exam Level Management';
      $breadcrumb = ['Home', 'Exam Master', 'Exam Level'];
      include '../components/breadcum.php';
      ?>
    <!-- Country management content (form/list) -->
    <div class="main-container" style="max-width: 700px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.07); padding: 36px 32px;">
      <form id="examLevelForm" style="margin-bottom: 32px; display: flex; align-items: flex-end; gap: 18px; flex-wrap: wrap;">
        <div style="flex: 1 1 300px; display: flex; flex-direction: column;">
          <label for="levelName" style="font-weight: bold; margin-bottom: 8px; color: #232b35;">Level Name <span style='color:red;'>*</span> :</label>
          <input type="text" id="levelName" name="levelName" required style="padding: 12px 16px; border-radius: 8px; border: 1.5px solid #e5e7eb; font-size: 1.08rem; background: #f8fafc; transition: border-color 0.2s;" />
        </div>
        <button type="submit" style="background: #17a2b8; color: #fff; border: none; border-radius: 8px; padding: 12px 38px; font-size: 1.1rem; font-weight: 600; cursor: pointer; box-shadow: 0 2px 8px rgba(23,162,184,0.08); transition: background 0.2s;">Submit</button>
      </form>
      <table style="width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.03); min-width: 400px;">
        <thead>
          <tr style="background: #4ee6f2; color: #232b35;">
            <th style="padding: 14px 10px; text-align: left; font-weight: 700; font-size: 1.05rem; letter-spacing: 0.5px;">#</th>
            <th style="padding: 14px 10px; text-align: left; font-weight: 700; font-size: 1.05rem; letter-spacing: 0.5px;">Exam Name</th>
            <th style="padding: 14px 10px; text-align: center; font-weight: 700; font-size: 1.05rem; letter-spacing: 0.5px;">Action</th>
          </tr>
        </thead>
        <tbody id="examLevelTable">
          <!-- Data rows will be inserted here by JS -->
        </tbody>
      </table>
    </div>

<!-- JS Scripts -->
<script src="../js/script.js"></script>
<script src="../js/common.js"></script>
<script src="../js/examlevel.js"></script>
</body>
</html>
