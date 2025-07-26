<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Master Data Stream</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/ownership.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
  <div class="main page-transition">
    <?php
        $pageTitle = 'Ownership';
        $breadcrumb = ['Home', 'Master Data', 'Ownership'];
        include '../components/breadcum.php';
      ?>
    <div class="main-container">
      <div class="degree-container">
        <form class="degree-form">
          <label for="ownershipName">Ownership Name:</label>
          <input type="text" id="ownershipName" name="ownershipName" class="degree-input" placeholder="Enter ownership name" />
          <button type="submit" class="degree-submit" id="ownershipSubmit">Submit</button>
          <button type="button" class="degree-submit" id="ownershipUpdate" style="display:none;">Update</button>
          <button type="button" class="degree-submit" id="ownershipBack" style="display:none;">Back</button>
        </form>
        <table class="degree-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Ownership Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Ownerships will be loaded here by JS -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
 <script src="../js/ownership.js"></script>
</body>
</html> 