'use strict';

var forEach = Array.prototype.forEach;
var filter = Array.prototype.filter;

var postProfiles = document.querySelectorAll('.post .postprofile');

var crossTableSummaryTR = document.querySelectorAll('.topbar-middle table[border="1"] > tbody > tr:first-child table tr'); // @TODO: Come up with a better selector
var tdTRs = filter.call(crossTableSummaryTR, function(node) {
  return node.textContent.indexOf('TD') > -1;
});



function isCrossTable() {
  return document.title.substr(0, 26) === 'USCF MSA - Cross Table for';
}

function isUSCFIdNode(item) {
  return item.textContent.indexOf('USCFId') > -1;
}

function wrapElement(node, id) {
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
}

function appendTDLevel(node, level) {
  var levelNode = document.createElement('dd');
  var content = document.createTextNode(level);
  
  levelNode.appendChild(content);
  node.parentNode.parentNode.appendChild(levelNode);
}

function getTDLevel(node, id) {
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
}

function processProfile(profile) {
  var ddsArray = Array.prototype.slice.call(profile.querySelectorAll('dd'));
  var idNode = ddsArray.filter(isUSCFIdNode)[0];
  var id = idNode.textContent.replace('USCFId: ', '');

  wrapElement(idNode, id);
  getTDLevel(idNode, id);
};

// @TODO: Refactor to remove duplication with processProfile
function processCrossTableTR(tr) {
  var nameNode = tr.querySelector('td:last-of-type');
  var idMatch = nameNode.textContent.match(/\(([^)]+)\)/);
  var id = idMatch ? idMatch[1] : id;

  wrapElement(nameNode, id);
  getTDLevel(nameNode, id);
};



forEach.call(postProfiles, processProfile);

if (isCrossTable()) {
  forEach.call(tdTRs, processCrossTableTR);
}