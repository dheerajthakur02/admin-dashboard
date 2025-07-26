<!-- Breadcrumb Header Component -->
<div class="main-header">
  <h1>
    <a
      href="admin/dashboard.php"
      style="color: inherit; text-decoration: none"
    >
      <i class="fa fa-database"></i>
    </a>
    <?= $pageTitle ?>
  </h1>
  <div class="breadcrumb"><?= implode(' / ', $breadcrumb) ?></div>
</div>
