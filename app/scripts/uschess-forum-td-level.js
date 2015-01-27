'use strict';

var forEach = Array.prototype.forEach;
var postProfiles = document.querySelectorAll('.post .postprofile');

var isUSCFIdNode = function(item) {
  return item.textContent.indexOf('USCFId') > -1;
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

var appendTDLevel = function(node, level) {
  var levelNode = document.createElement('dd');
  var content = document.createTextNode(level);
  
  levelNode.appendChild(content);
  node.parentNode.parentNode.appendChild(levelNode);
};

var getTDLevel = function(node, id) {
  var url = 'http://www.uschess.org/msa/MbrDtlTnmtDir.php?' + id;
  var request = new XMLHttpRequest();
  
  request.open('GET', url, true);

  request.onerror = function() {};
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var resp = request.responseText;

      var level = resp;
      level = level.substring(level.indexOf('Certification Level') + 35);
      level = level.substring(0, level.indexOf('</b>'));

      appendTDLevel(node, level);
    }
  };

  request.send();
};

var processProfile = function(profile) {
  var ddsArray = Array.prototype.slice.call(profile.querySelectorAll('dd'));
  var idNode = ddsArray.filter(isUSCFIdNode)[0];
  var id = idNode.textContent.replace('USCFId: ', '');

  wrapElement(idNode, id);
  getTDLevel(idNode, id);
};

forEach.call(postProfiles, processProfile);
