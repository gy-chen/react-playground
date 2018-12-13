import React from 'react';
import { Wizard, Steps, Step } from 'react-albus';

import { storiesOf } from '@storybook/react';

storiesOf('Albus', module)
    .add('basic', () => (
        <Wizard>
            <Steps>
                <Step
                    id="step1"
                    render={({ next }) => (
                        <div>
                            <h1>Step1</h1>
                            <button onClick={next}>Next</button>
                        </div>
                    )}
                />
                <Step
                    id="step2"
                    render={({ next, previous }) => (
                        <div>
                            <h1>Step2</h1>
                            <button onClick={previous}>Previous</button>
                            <button onClick={next}>Next</button>
                        </div>
                    )}
                />
                <Step
                    id="step3"
                    render={({ previous }) => (
                        <div>
                            <h1>Step3</h1>
                            <button onClick={previous}>Previous</button>
                        </div>
                    )}
                />
            </Steps>
        </Wizard>
    ));
