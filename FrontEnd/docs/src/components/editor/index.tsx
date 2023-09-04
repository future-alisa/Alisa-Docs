//this is important, because we need to point out the component is client or server one while rendering.
'use client';
// Import React dependencies.
import React, { useState } from 'react'
// Import the Slate editor factory.
import { createEditor } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

const initialValue:any = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

const DefineEditor = () => {
    const [editor] = useState(() => withReact(createEditor()))
    return (
        // Add the editable component inside the context.
        <Slate editor={editor} initialValue={initialValue}>
            <Editable />
        </Slate>
    )
}

export default DefineEditor;