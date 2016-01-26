'use strict';

document.addEventListener('click', function (e) {
  if (document.activeElement.tagName !== 'A') return;
  getSelection().removeAllRanges();
  var range = document.createRange();
  range.selectNode(document.activeElement.lastElementChild);
  getSelection().addRange(range);
  document.execCommand('copy') && getSelection().removeAllRanges();
});

document.addEventListener('mousedown', function (_ref) {
  var t = _ref.target;
  var x = _ref.offsetX;
  var y = _ref.offsetY;

  if (t.tagName == 'DIV') t.style.transformOrigin = x + 'px ' + y + 'px';
});
