document.addEventListener('click', e => {
  if (document.activeElement.tagName !== 'A') return
  getSelection().removeAllRanges()
  let range = document.createRange()
  range.selectNode(document.activeElement.lastElementChild)
  getSelection().addRange(range)
  document.execCommand('copy') && getSelection().removeAllRanges()
})

document.addEventListener('mousedown', ({target:t, offsetX:x, offsetY:y}) => {
  if (t.tagName == 'DIV') t.style.transformOrigin = `${x}px ${y}px`
})

