<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Master Data Stream</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/stream.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
</head>
<body>
  <?php include '../components/header.php'; ?>
  <?php include '../components/sidebar.php'; ?>
  <div class="main page-transition">
        <?php
        $pageTitle = 'Stream Management';
        $breadcrumb = ['Home', 'Master Data', 'Stream'];
        include '../components/breadcum.php';
      ?>
    <div class="main-container" style="max-width: 900px; margin: 0 auto;">
      <div class="top-actions">
        <button id="showStreamFormBtn"><span>➕</span> Add Stream</button>
        <button id="showRecordListBtn"><span>📋</span> Record List</button>
      </div>
      <div id="streamFormDiv" style="display:none;">
        <form class="stream-form">
          <div class="stream-row">
            <div>
              <label>Stream Name :</label>
              <input type="text" placeholder="Enter stream name" name="name">
            </div>
            <div>
              <label>Stream Logo :</label>
              <input name="logo" type="file">
            </div>
          </div>
          <label>About Stream:</label>
          <textarea name="about" placeholder="Description"></textarea>
          <div class="section-block" id="section-initial-block">
            <label>Section Title</label>
            <input type="text" name="section_title[]" placeholder="Section Title">
            <label>Description</label>
            <textarea name="section_description[]" placeholder="Description"></textarea>
          </div>
          <div id="section-container"></div>
          <button type="button" class="add-section-btn">+ Add New Section</button>
          <div>
          <button type="submit" class="submit-btn">Submit</button>
          <button type="submit" class="submit-btn" style="background-color:rgb(118, 117, 117);">Cancel</button>
          </div> 
        </form>
      </div>
      <div id="streamListDiv" style="display:none;">
        <table id="streamTable" style="width:100%;background:#fff;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.06);overflow:hidden;">
        </table>
      </div>
    </div>
    <?php include '../components/footer.php'; ?>
  </div>
  <script src="../js/stream.js"></script>
  <script src="../js/common.js"></script>
 
</body>
</html> 