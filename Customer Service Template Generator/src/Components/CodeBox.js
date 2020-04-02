import React from 'react';
import { CopyBlock, dracula } from 'react-code-blocks'
import { buildText } from '../util.js'

const CodeBox = ({ data }) => {

    let text = buildText(data);

    return (
                <CopyBlock text={text}
                    language={'javascript'}
                    showLineNumbers={true}
                    theme={dracula}
                    wrapLines
                    codeBlock />
    )
}
export default CodeBox;