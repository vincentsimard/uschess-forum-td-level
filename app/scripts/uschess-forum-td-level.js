'use strict';

var forEach = Array.prototype.forEach;
var postProfiles = document.querySelectorAll('.post .postprofile');

var isUSCFIdNode = function(item) {
  return item.textContent.indexOf('USCFId') > -1;
};

var processProfile = function(profile) {
  var ddsArray = Array.prototype.slice.call(profile.querySelectorAll('dd'));
  var idNode = ddsArray.filter(isUSCFIdNode)[0];
  var id = idNode.textContent.replace('USCFId: ', '');

  wrapElement(idNode, id);
};

var wrapElement = function(node, id) {
  var createUSCFLink = function(node, id) {
    var link = document.createElement('a');
    link.href = 'http://www.uschess.org/msa/MbrDtlMain.php?' + id;
    link.appendChild(node);

    return link;
  };
  
  var parent = node.parentNode;

  var position = 0;
  for(var i = 0; i<parent.childNodes.length; i++) {
    if(parent.childNodes[i] === node) {
      position = i;
      break;
    };
  };

  parent.insertBefore(createUSCFLink(node, id), parent.childNodes[position]);
};

forEach.call(postProfiles, processProfile);
