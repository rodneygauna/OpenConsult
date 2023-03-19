// Select2 plugin
// -------------------
// This is a custom plugin for select2
// It is used to add a search box to the select2 dropdown
// It is used in the select2 dropdowns in the form advanced plugin
$(document).ready(function() {
  // Add search box to select2 dropdown
  $('.select2-search').select2();
});

/* banner functions */
var fadeOutInterval;

function showBanner() {
    var banner = document.getElementsByClassName("banner")[0];
    banner.style.display = "flex";
    resetHideTimer();
}

function hideBanner() {
    var banner = document.getElementsByClassName("banner")[0];
    banner.style.opacity = 1;
    fadeOutInterval = setInterval(function() {
        if (banner.style.opacity > 0) {
            banner.style.opacity -= 0.1;
        } else {
            clearInterval(fadeOutInterval);
            banner.style.display = "none";
        }
    }, 60);
}

function resetHideTimer() {
    clearInterval(fadeOutInterval);
    fadeOutInterval = setTimeout(hideBanner, 5000);
}

var bannerSuccess = document.getElementsByClassName("banner success")[0];
if (bannerSuccess) {
    resetHideTimer();
}
