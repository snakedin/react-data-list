import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeWrapper({ code }) {

    return (
        <div>
            <SyntaxHighlighter language="javascript" style={ coy }>
                { code }
            </SyntaxHighlighter>
        </div>
    );
}

export default CodeWrapper;
