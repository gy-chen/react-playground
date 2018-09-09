import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/markdown/markdown.js';
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
    this._codemirror.getDoc()
      .setValue(`### CodeMirror\nDefault options\n${JSON.stringify(CodeMirror.defaults, undefined, 2)}`);
  }

  render() {
    return (<textarea ref={ref => this._ref = ref}></textarea>);
  }
}

storiesOf('CodeMirror', module)
    .add('Basic', () => <CM lineWrapping={true} />)
    .add('Markdown mode', () => <CM lineWrapping={true} mode="markdown" />);
