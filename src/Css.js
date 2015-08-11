const SPACE = ' ';
const RE_CLASS = /[\n\t\r]/g;

function norm(elemClass) {
  return (SPACE + elemClass + SPACE).replace(RE_CLASS, SPACE);
}

module.exports = {
  addClass(elem, className) {
    elem.className += ' ' + className;
  },

  removeClass(elem, n) {
    const elemClass = elem.className.trim();
    let className = norm(elemClass);
    let needle = n.trim();
    needle = SPACE + needle + SPACE;
    // 一个 cls 有可能多次出现：'link link2 link link3 link'
    while (className.indexOf(needle) >= 0) {
      className = className.replace(needle, SPACE);
    }
    elem.className = className.trim();
  },
};
