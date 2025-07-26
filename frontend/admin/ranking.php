<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Master Data Stream</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/ranking.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
  <div class="main page-transition">
    <?php
        $pageTitle = 'Ranking';
        $breadcrumb = ['Home', 'Master Data', 'Ranking'];
        include '../components/breadcum.php';
      ?>
    <div class="main-container">
      <div class="degree-container">
        <form class="degree-form">
          <label for="rankingBodyName">Body Name:</label>
          <input type="text" id="rankingBodyName" name="nameInput" class="degree-input" placeholder="Body Name" />
          <label for="rankingValue">Rank Value:</label>
          <input type="text" id="rankingValue" name="valueInput" class="degree-input" placeholder="Rank Value" />
          <button type="submit" class="degree-submit" id="rankingSubmit">Submit</button>
          <button type="button" class="degree-submit" id="rankingUpdate" style="display:none;">Update</button>
          <button type="button" class="degree-submit" id="rankingBack" style="display:none;">Back</button>
        </form>
        <table class="degree-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Body Name</th>
              <th>Rank Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Rankings will be loaded here by JS -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
 <script src="../js/ranking.js"></script>
 <script src="../js/common.js"></script>
</body>
</html> 