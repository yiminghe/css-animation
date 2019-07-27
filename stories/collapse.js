import anim from '../src';
import React from 'react';
import ReactDOM from 'react-dom';
import { storiesOf } from '@storybook/react';
const style = `

.box {
  background:red;
  width:100px;
  height:100px;
}
.collapse-active {
  transition: height .3s ease-out;
}

`;

let show = true;

function toggle() {
  const t = document.getElementById('t');
  const b = document.getElementById('b');
  b.disabled = true;
  t.style.display = '';
  let height;
  anim(t, `collapse`, {
    start() {
      if (show) {
        t.style.height = `${t.offsetHeight}px`;
      } else {
        height = t.offsetHeight;
        t.style.height = 0;
      }
    },
    active() {
      t.style.height = `${show ? height : 0}px`;
    },
    end() {
      t.style.display = show ? '' : 'none';
      b.disabled = false;
      t.style.height = '';
    },
  });
  show = !show;
}

const Demo = () => (
  <div>
    <style dangerouslySetInnerHTML={{ __html: style }}></style>
    <div className="box" id="t"></div>
    <button onClick={toggle} id="b">
      toggle
    </button>
  </div>
);

Demo.story = 'collapse';

storiesOf(Demo.story, module).add('demo', () => <Demo />);

export default Demo;
