const Event = require('./Event');
const Css = require('./Css');
const isCssAnimationSupported = Event.endEvents.length !== 0;

function getDuration(node, name) {
  const style = window.getComputedStyle(node);
  const prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];
  let ret = '';
  for (let i = 0; i < prefixes.length; i++) {
    ret = style.getPropertyValue(prefixes[i] + name);
    if (ret) {
      break;
    }
  }
  return (ret);
}

function fixBrowserByTimeout(node) {
  if (isCssAnimationSupported) {
    const transitionDuration = parseFloat(getDuration(node, 'transition-duration')) || 0;
    const animationDuration = parseFloat(getDuration(node, 'animation-duration')) || 0;
    const time = Math.max(transitionDuration, animationDuration);
    // sometimes, browser bug
    node.rcEndAnimTimeout = setTimeout(() => {
      node.rcEndAnimTimeout = null;
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    }, (time) * 1000 + 200);
  }
}

function clearBrowserBugTimeout(node) {
  if (node.rcEndAnimTimeout) {
    clearTimeout(node.rcEndAnimTimeout);
    node.rcEndAnimTimeout = null;
  }
}

const cssAnimation = (node, transitionName, callback) => {
  const className = transitionName;
  const activeClassName = className + '-active';

  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = (e) => {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    clearBrowserBugTimeout(node);

    Css.removeClass(node, className);
    Css.removeClass(node, activeClassName);

    Event.removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional callback is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (callback) {
      callback();
    }
  };

  Event.addEndEventListener(node, node.rcEndListener);

  Css.addClass(node, className);

  node.rcAnimTimeout = setTimeout(() => {
    node.rcAnimTimeout = null;
    Css.addClass(node, activeClassName);
    fixBrowserByTimeout(node);
  }, 0);

  return {
    stop() {
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    },
  };
};

cssAnimation.style = (node, style, callback) => {
  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = (e) => {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    clearBrowserBugTimeout(node);

    Event.removeEndEventListener(node, node.rcEndListener);
    node.rcEndListener = null;

    // Usually this optional callback is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (callback) {
      callback();
    }
  };

  Event.addEndEventListener(node, node.rcEndListener);

  node.rcAnimTimeout = setTimeout(() => {
    for (const s in style) {
      if (style.hasOwnProperty(s)) {
        node.style[s] = style[s];
      }
    }
    node.rcAnimTimeout = null;
    fixBrowserByTimeout(node);
  }, 0);
};

cssAnimation.setTransition = (node, p, value) => {
  let property = p;
  let v = value;
  if (value === undefined) {
    v = property;
    property = '';
  }
  property = property || '';
  ['Webkit',
    'Moz',
    'O',
    // ms is special .... !
    'ms'].forEach((prefix) => {
      node.style[`${prefix}Transition${property}`] = v;
    });
};

cssAnimation.addClass = Css.addClass;
cssAnimation.removeClass = Css.removeClass;
cssAnimation.isCssAnimationSupported = isCssAnimationSupported;

module.exports = cssAnimation;
