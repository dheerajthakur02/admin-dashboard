<!-- Top Bar Component -->
<div
  class="topbar"
  style="
    width: 100%;
    background: #22d3a7;
    min-height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 2;
  "
>
  <button
    class="hamburger"
    id="sidebarToggle"
    aria-label="Open sidebar"
    style="
      position: static;
      margin-left: 18px;
      margin-right: 0;
      font-size: 2rem;
      background: none;
      border: none;
      color: #232b35;
    "
  >
    <i class="fa fa-bars"></i>
  </button>
  <span style="flex: 1"></span>
  <button
    style="
      background: none;
      border: none;
      margin-right: 18px;
      font-size: 1.5rem;
      color: #232b35;
      cursor: pointer;
    "
    id="fullscreenToggle"
    aria-label="Toggle fullscreen"
  >
    <i class="fa fa-expand-arrows-alt"></i>
  </button>
</div>
<div class="sidebar-overlay hide" id="sidebarOverlay"></div>