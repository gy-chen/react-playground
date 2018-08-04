import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import MarkdownIt from 'markdown-it';

class Basic extends Component {

    constructor(props) {
        super(props);

        this._markdownContent = `# Hello Markdown
from source:

\`\`\` markdown
# Hello Markdown
\`\`\`
        `;
        this._md = MarkdownIt();
    }

    render() {
        const renderedMarkdownContent = this._md.render(this._markdownContent);
        console.log(renderedMarkdownContent);
        return (
            <div dangerouslySetInnerHTML={{__html: renderedMarkdownContent}} />
        );
    }
}

storiesOf('MarkdownIt', module)
    .add('Basic', () => <Basic />);