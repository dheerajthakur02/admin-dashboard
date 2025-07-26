<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>College Data Display</title>
  <link href="../style.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
  <div class="main page-transition">
    <div class="main-container" style="max-width: 1400px; margin: 0 auto;">
      <h2 style="margin-top: 0; color: #2563eb; font-size: 1.8rem; margin-bottom: 24px;">College Data Display</h2>
      <div style="overflow-x: auto;">
        <table class="state-table" style="width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.03); min-width: 1200px;">
          <thead>
            <tr style="background: #f8fafc; color: #374151;">
              <th>#</th>
              <th>College Name</th>
              <th>Estd</th>
              <th>Affiliation</th>
              <th>Approved</th>
              <th>Stream</th>
              <th>Course</th>
              <th>Logo</th>
              <th>Address</th>
              <th>State</th>
              <th>District</th>
              <th>Phone</th>
              <th>Email</th>
              <th>website</th>
            </tr>
          </thead>
          <tbody id="dataDisplayTable" style="font-size: 0.95rem;"></tbody>
        </table>
      </div>
    </div>
  </div>
  <script src="../js/common.js"></script>
  <script src="../js/datadisplay.js"></script>
</body>
</html> 