<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Master Data Stream</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/collegeFacility.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
  <div class="main page-transition">
    <?php
        $pageTitle = 'College Facility';
        $breadcrumb = ['Home', 'Master Data', 'College Facility'];
        include '../components/breadcum.php';
      ?>
    <div class="main-container">
      <div class="degree-container">
        <form class="degree-form" enctype="multipart/form-data">
          <label for="facilityName">College Facilities Name:</label>
          <input type="text" id="facilityName" name="facilityName" class="degree-input" placeholder="Enter facility name" />
          <label for="facilityLogo">Photo :</label>
          <input type="file" id="facilityLogo" name="facilityLogo" class="degree-input" accept="image/*" />
          <button type="submit" class="degree-submit" id="facilitySubmit">Submit</button>
          <button type="button" class="degree-submit" id="facilityUpdate" style="display:none;">Update</button>
          <button type="button" class="degree-submit" id="facilityBack" style="display:none;">Back</button>
        </form>
        <table class="degree-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Facilities Name</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Facilities will be loaded here by JS -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
 <script src="../js/collegeFacility.js"></script>
</body>
</html> 