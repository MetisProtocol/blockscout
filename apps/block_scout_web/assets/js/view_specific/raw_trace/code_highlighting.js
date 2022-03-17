import hljs from 'highlight.js/lib/core'
import hljsDefineSolidity from 'highlightjs-solidity'

// only activate highlighting on pages with this selector
if (document.querySelectorAll('[data-activate-highlight]').length > 0) {
  hljsDefineSolidity(hljs)
  hljs.highlightAll()
}
