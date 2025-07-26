<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Master Data Stream</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/affilication.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
  <div class="main page-transition">
    <?php
        $pageTitle = 'Affilication';
        $breadcrumb = ['Home', 'Master Data', 'Affilication'];
        include '../components/breadcum.php';
      ?>
    <div class="main-container">
      <div class="degree-container">
        <form class="degree-form">
          <label for="affiliationName">Affiliated By (Affiliation Board Name):</label>
          <input type="text" id="affiliationName" name="affiliationName" class="degree-input" placeholder="Enter affiliation board name" />
          <button type="submit" class="degree-submit" id="affiliationSubmit">Submit</button>
          <button type="button" class="degree-submit" id="affiliationUpdate" style="display:none;">Update</button>
          <button type="button" class="degree-submit" id="affiliationBack" style="display:none;">Back</button>
        </form>
        <table class="degree-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Affiliation Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Affiliations will be loaded here by JS -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
 <script src="../js/affilication.js"></script>
 <script src="../js/common.js"></script>
</body>
</html> 