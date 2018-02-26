import React from 'react';
import { SingleSlider } from 'react-slider-kit';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

storiesOf('SliderKit', module)
    .add('basic', () => (
        <SingleSlider
            min={0}
            max={100}
            step={20}
            start={80}
            onChangeStart={action('start drag')}
            onChange={action('drag')}
            onChangeComplete={action('drag complete')}
        />
    ))
    .add('with chart', () => (
        <SingleSlider
            min={0}
            max={100}
            step={20}
            start={80}
            chartLength={600}
            chartData={[{ y: 0 }, { y: 1 }]}
            onChangeStart={action('start drag')}
            onChange={action('drag')}
            onChangeComplete={action('drag complete')}
        />
    ));
