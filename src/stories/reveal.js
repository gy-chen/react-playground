import React from 'react';
import Zoom from 'react-reveal/Zoom';

import {storiesOf} from '@storybook/react';

storiesOf('react-reveal', module)
    .add('Basic', () => (
        <Zoom>
            <p>Hello World!</p>
        </Zoom>
    ))
    .add('Scroll reveal', () => (
        <Zoom>
            <p style={{marginTop: 1000}}>Hello World!</p>
        </Zoom>
    ));