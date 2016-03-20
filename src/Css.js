const SPACE = ' ';
const RE_CLASS = /[\n\t\r]/g;

function norm(elemClass) {
  return (SPACE + elemClass + SPACE).replace(RE_CLASS, SPACE);
}

module.exports = {
  hasClass(elem, className) {
    if (elem.classList) {
        return elem.classList.contains(className);
    } else {
        var originClass = elem.className;
        return originClass.indexOf(className) > -1;
    }
  }
  addClass(elem, className) {
    elem.className += ' ' + className;
    if (elem.classList) {
        elem.classList.add(className);
    } else {
        if (!this.hasClass(elem, className)) {
           elem.className += ' ' + className;
        }
    }
  },

  removeClass(elem, n) {
    let needle = n.trim();
    if (elem.classList) {
        elem.classList.remove(n);
    } else {
      const elemClass = elem.className.trim();
      let className = norm(elemClass);
      needle = SPACE + needle + SPACE;
      // 一个 cls 有可能多次出现：'link link2 link link3 link'
      while (className.indexOf(needle) >= 0) {
        className = className.replace(needle, SPACE);
      }
      elem.className = className.trim();
    }
  },
};
 
