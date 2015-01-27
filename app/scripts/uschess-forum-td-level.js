'use strict';

var forEach = Array.prototype.forEach;
var postProfiles = document.querySelectorAll('.post .postprofile');

var getUSCFId = function(profile) {
  var isUSCFIdNode = function(item) {
    return item.textContent.indexOf('USCFId') > -1;
  };

  var dds = profile.querySelectorAll('dd');
  var ddsArray = Array.prototype.slice.call(dds);

  var idDD = ddsArray.filter(isUSCFIdNode);

  console.log(idDD[0] && idDD[0].textContent.replace('USCFId: ', ''));
};

var processProfile = function(profile) {
  var id = getUSCFId(profile);

  // console.log(profile);
};

forEach.call(postProfiles, processProfile);

