//this is important, because we need to point out the component is client or server one while rendering.
'use client';
// Import React dependencies.
import React, { useState } from 'react'
// Import the Slate editor factory.
import { Descendant, createEditor } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'

const initialValue: any[] = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

const MyEditor = () => {
    const [editor] = useState(() => withReact(createEditor()))
    const onChange = (event:[{type:string,children:any}]) => {
        console.log(event[0].type)
        console.log(event[0].children[0].text)
    };
    const onKeyDown=(event:{key:any})=>{console.log(event.key)}
    return (
        <Slate editor={editor} initialValue={initialValue} onChange={onChange}>
            <Editable onKeyDown={onKeyDown} onChange={onChange}/>
        </Slate>
    )
}

export default MyEditor;