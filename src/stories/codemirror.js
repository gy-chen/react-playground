import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';


class CM extends Component {

  constructor(props) {
    super(props);

    this._codemirror = null;
    this._ref = null;
  }

  componentDidMount() {
    const { ...options } = this.props;

    this._codemirror = CodeMirror.fromTextArea(this._ref, options);
  }

  render() {
    return (<textarea ref={ref => this._ref = ref}></textarea>);
  }
}

storiesOf('CodeMirror', module)
    .add('Basic', () => <CM />);
