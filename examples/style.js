// use jsx to render html, do not modify simple.html
'use strict';


var anim = require('css-animation');
var React = require('react');

var style = `

.box {
  background:red;
  width:100px;
  height:100px;
}
`;

var show = true;

function toggle() {
  var t = document.getElementById('t');
  var b = document.getElementById('b');
  b.disabled = true;
  t.style.visibility = '';
  t.style.opacity = show ? 1 : 0;
  anim.setTransition(t,'opacity 2s ease-in');
  anim.style(t, (show ? {
    opacity: 0
  } : {
    opacity: 1
  }), function () {
    console.log('end');
    t.style.visibility = show ? '' : 'hidden';
    b.disabled = false;
    anim.setTransition(t,'');
  });
  show = !show;
}

React.render(<div>
  <style dangerouslySetInnerHTML={{__html: style}}></style>
  <div className="box" id='t'>
  </div>
  <button onClick={toggle} id='b'>toggle</button>
</div>, document.getElementById('__react-content'));
