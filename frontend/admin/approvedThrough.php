<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Master Data Stream</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/approvedThrough.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
  <div class="main page-transition">
    <?php
        $pageTitle = 'Approved Through';
        $breadcrumb = ['Home', 'Master Data', 'Approved Through'];
        include '../components/breadcum.php';
      ?>
    <div class="main-container">
      <div class="degree-container">
        <form class="degree-form">
          <label for="approverName">Approved Through (Approver Board Name):</label>
          <input type="text" id="approverName" name="approverName" class="degree-input" placeholder="Enter approver board name" />
          <button type="submit" class="degree-submit" id="approverSubmit">Submit</button>
          <button type="button" class="degree-submit" id="approverUpdate" style="display:none;">Update</button>
          <button type="button" class="degree-submit" id="approverBack" style="display:none;">Back</button>
        </form>
        <table class="degree-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Approver Board Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Approvers will be loaded here by JS -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
 <script src="../js/approvedThrough.js"></script>
</body>
</html> 