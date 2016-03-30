import anim from 'css-animation';
import React from 'react';
import ReactDOM from 'react-dom';

const style = `

.box {
  background:red;
  width:100px;
  height:100px;
}
.fade-enter {
  opacity: 0;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  animation-play-state: paused;
}

.fade-leave {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  animation-play-state: paused;
}

.fade-enter.fade-enter-active {
  animation-name: rcDialogFadeIn;
  animation-play-state: running;
}

.fade-leave.fade-leave-active {
  animation-name: rcDialogFadeOut;
  animation-play-state: running;
}

@keyframes rcDialogFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes rcDialogFadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
`;

let show = true;

function toggle() {
  const t = document.getElementById('t');
  const b = document.getElementById('b');
  b.disabled = true;
  t.style.visibility = '';
  anim(t, `fade-${show ? 'leave' : 'enter'}`, () => {
    t.style.visibility = show ? '' : 'hidden';
    b.disabled = false;
  });
  show = !show;
}

ReactDOM.render(<div>
  <style dangerouslySetInnerHTML={{ __html: style }}></style>
  <div className="box" id="t">
  </div>
  <button onClick={toggle} id="b">toggle</button>
</div>, document.getElementById('__react-content'));
