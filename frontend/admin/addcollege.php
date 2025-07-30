<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>College Management</title>
  <link href="../style.css" rel="stylesheet" />
  <link href="../css/addCollege.css" rel="stylesheet" />
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
    
    <div class="main-container">
      <div class="top-btns">
        <button id="showFormBtn" class="main-btn btn-primary">
          <span>➕</span> Add College
        </button>
        <button id="showListBtn" class="main-btn btn-secondary">
          <span>📋</span> College List
        </button>
      </div>
      
      <div id="collegeFormDiv" class="form-container">
        <form id="addCollegeForm" enctype="multipart/form-data" class="college-form">
          <h2 class="form-title">Add New College</h2>
          
          <!-- Basic Information Section -->
          <div class="form-section">
            <h3 class="section-title">Basic Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="name">College Name *</label>
                <input type="text" id="name" name="name" required class="form-input">
              </div>
              <div class="form-group">
                <label for="popularName">Popular Name</label>
                <input type="text" id="popularName" name="popularName" class="form-input">
              </div>
              <div class="form-group">
                <label for="shortName">Short Name</label>
                <input type="text" id="shortName" name="shortName" class="form-input">
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="establishedYear">Established Year</label>
                <input type="text" id="establishedYear" name="establishedYear" class="form-input" placeholder="e.g., 1995">
              </div>
              <div class="form-group">
                <label for="campusSize">Campus Size</label>
                <input type="text" id="campusSize" name="campusSize" class="form-input" placeholder="e.g., 50 acres">
              </div>
              <div class="form-group">
                <label for="typeMode">Type Mode *</label>
                <select id="typeMode" name="typeMode" required class="form-select">
                  <option value="">-- Select Type --</option>
                  <option value="fullTime">Full Time</option>
                  <option value="partTime">Part Time</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Address Section -->
          <div class="form-section">
            <h3 class="section-title">Address Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="addressLine1">Address Line 1</label>
                <input type="text" id="addressLine1" name="address[line1]" class="form-input">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="addressLine2">Address Line 2</label>
                <input type="text" id="addressLine2" name="address[line2]" class="form-input">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="state">State</label>
                <select id="state" name="state" class="form-select">
                  <option value="">-- Select State --</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="pincode">Pincode</label>
                <input type="text" id="pincode" name="address[pincode]" class="form-input" placeholder="e.g., 123456">
              </div>
              <div class="form-group">
                <label for="district">District</label>
                <select id="district" name="district" class="form-select">
                  <option value="">-- Select District --</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Description Section -->
          <div class="form-section">
            <h3 class="section-title">Description</h3>
            <div class="form-group">
              <label for="collegeShortDescription">Short Description</label>
              <textarea id="collegeShortDescription" name="collegeShortDescription" class="form-textarea" rows="3" placeholder="Brief description of the college"></textarea>
            </div>
            <div class="form-group">
              <label for="collegeLongDescription">Long Description</label>
              <textarea id="collegeLongDescription" name="collegeLongDescription" class="form-textarea" rows="5" placeholder="Detailed description of the college"></textarea>
            </div>
          </div>
          
          <!-- Media Section -->
          <div class="form-section">
            <h3 class="section-title">Media & Documents</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="collegeLogo">College Logo</label>
                <input type="file" id="collegeLogo" name="collegeLogo" accept="image/*" class="form-file">
                <div class="file-preview">
                  <img id="collegeLogoPreview" src="" alt="" class="preview-image">
                </div>
              </div>
              <div class="form-group">
                <label for="collegeBanner">College Banner</label>
                <input type="file" id="collegeBanner" name="collegeBanner" accept="image/*" class="form-file">
                <div class="file-preview">
                  <img id="collegeBannerPreview" src="" alt="" class="preview-image">
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="collegeGallery">College Gallery (Multiple)</label>
                <input type="file" id="collegeGallery" name="collegeGallery[]" accept="image/*" multiple class="form-file">
                <div class="file-preview" id="galleryPreview"></div>
              </div>
              <div class="form-group">
                <label for="collegeVideo">College Videos (Multiple)</label>
                <input type="file" id="collegeVideo" name="collegeVideo[]" accept="video/*" multiple class="form-file">
                <div class="file-preview" id="videoPreview"></div>
              </div>
            </div>
          </div>
          
          <!-- Related Data Section -->
          <div class="form-section">
            <h3 class="section-title">Related Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="affiliation">Affiliation *</label>
                <select id="affiliation" name="affiliation" required class="form-select">
                  <option value="">-- Select Affiliation --</option>
                </select>
              </div>
              <div class="form-group">
                <label for="approvedThrough">Approved Through *</label>
                <select id="approvedThrough" name="approvedThrough" class="form-select" required>
                  <option value="">-- Select Approval Body --</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="facilities">Facilities</label>
                <select id="facilities" name="facilities" class="form-select">
                  <option value="">-- Select Facility --</option>
                </select>
              </div>
              <div class="form-group">
                <label for="collegeCourses">College Courses</label>
                <select id="collegeCourses" name="collegeCourses" class="form-select">
                  <option value="">-- Select Course --</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Form Actions -->
          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-secondary">Reset</button>
          </div>
        </form>
      </div>
      
      <div id="collegeListDiv" class="list-container">
        <h2 class="list-title">College List</h2>
        <div class="table-container">
          <table class="college-table">
            <thead>
              <tr>
                <th>#</th>
                <th>College Name</th>
                <th>Popular Name</th>
                <th>Short Name</th>
                <th>Established Year</th>
                <th>Type Mode</th>
                <th>Affiliation</th>
                <th>Approved Through</th>
                <th>Facilities</th>
                <th>Courses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="collegeTable"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit College Modal -->
  <div id="editCollegeModal" class="modal">
    <div class="modal-content">
      <span id="closeEditCollegeModal" class="modal-close">&times;</span>
      <h2 class="modal-title">Edit College</h2>
      <form id="editCollegeForm" enctype="multipart/form-data" class="edit-form">
        <input type="hidden" name="id" id="editCollegeId">
        
        <div class="form-row">
          <div class="form-group">
            <label for="editName">College Name *</label>
            <input type="text" id="editName" name="name" required class="form-input">
          </div>
          <div class="form-group">
            <label for="editPopularName">Popular Name</label>
            <input type="text" id="editPopularName" name="popularName" class="form-input">
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="editShortName">Short Name</label>
            <input type="text" id="editShortName" name="shortName" class="form-input">
          </div>
          <div class="form-group">
            <label for="editTypeMode">Type Mode *</label>
            <select id="editTypeMode" name="typeMode" required class="form-select">
              <option value="fullTime">Full Time</option>
              <option value="partTime">Part Time</option>
            </select>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="editAffiliation">Affiliation *</label>
            <select id="editAffiliation" name="affiliation" required class="form-select">
              <option value="">-- Select Affiliation --</option>
            </select>
          </div>
          <div class="form-group">
            <label for="editApprovedThrough">Approved Through *</label>
            <select id="editApprovedThrough" name="approvedThrough" class="form-select" required>
              <option value="">-- Select Approval Body --</option>
            </select>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="editFacilities">Facilities</label>
            <select id="editFacilities" name="facilities" class="form-select">
              <option value="">-- Select Facility --</option>
            </select>
          </div>
          <div class="form-group">
            <label for="editCollegeCourses">College Courses</label>
            <select id="editCollegeCourses" name="collegeCourses" class="form-select">
              <option value="">-- Select Course --</option>
            </select>
          </div>
        </div>
        
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Save Changes</button>
          <button type="button" id="cancelEditCollegeBtn" class="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </div>

  <!-- JS Scripts -->
  <script src="../js/common.js"></script>
  <script src="../js/addcollege.js"></script>
</body>
</html>

