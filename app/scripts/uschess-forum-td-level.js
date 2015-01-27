'use strict';

var forEach = Array.prototype.forEach;
var postProfiles = document.querySelectorAll('.post .postprofile');

forEach.call(postProfiles, function(profile) {
  console.log(profile);
});
