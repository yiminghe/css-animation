import Events from 'css-animation/lib/Event';
import React from 'react';
import ReactDOM from 'react-dom';

const style = `
.box {
  background:red;
  width:100px;
  height:100px;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);
  animation-play-state: paused;

  animation-name: fadeIn;
  animation-play-state: running;
}

.active {
  animation-name: fadeOut;
  animation-play-state: running;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
`;

setTimeout(() => {
  const t = document.getElementById('t');
  Events.addStartEventListener(t, () => {
    console.log('transition start...');
  });
  Events.addEndEventListener(t, () => {
    console.log('transition end...');
  });
}, 100);

let changed = false;

function toggle() {
  const t = document.getElementById('t');
  changed = !changed;

  if (changed) {
    t.className = 'box active';
  } else {
    t.className = 'box';
  }
}

ReactDOM.render(<div>
  <style dangerouslySetInnerHTML={{ __html: style }}></style>
  <div className="box" id="t">
  </div>
  <button onClick={toggle}>toggle</button>
</div>, document.getElementById('__react-content'));
