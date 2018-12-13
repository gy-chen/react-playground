import React from 'react';
import ReactMorph from 'react-morph';

import { storiesOf } from '@storybook/react';

storiesOf('Morph', module)
    .add('basic', () => (
        <ReactMorph>
            {({ from, to, fadeIn, go}) => (
              <div>
                  <div onClick={() => go(1)}>
                      <p {...from('text1')}>Hello</p>
                      <h1 {...to('text1')}>World</h1>
                  </div>
                  <a onClick={() => go(0)} {...fadeIn()}>
                      Back
                  </a>
              </div>
            )}
        </ReactMorph>
    ));
