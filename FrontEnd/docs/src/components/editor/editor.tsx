//this is important, because we need to point out the component is client or server one while rendering.
"use client";
import MySocket from "../../websocket/MySocket";
import { Guid } from "guid-typescript";

import React, { useState } from "react";
import { createEditor, Transforms, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const MyEditor = () => {
    let changeBySelf=false
  const guid = Guid.create();
  const ws = new MySocket("ws://localhost:8080/websocket/" + guid);

  const listener = (event: any ) => {
    console.log("接收到消息" + event.data);
    // 渲染editor
    let msg=JSON.parse(event.data)
    if(msg.uid.value!=guid.value){
        msg.opts.map((x:any)=>editor.apply(x))
        changeBySelf=false
    }
  };

  ws.listen(listener);

  // 创建 Slate 编辑器
  const editor = withReact(createEditor());

  // 创建初始文本 state
  const [text, setText] = useState([
    {
      type: "paragraph",
      children: [{ text: "Hello, Slate.js" }],
    },
  ]);

  // 定义一个处理文本变化的函数
  const notifyTextChange = () => {
    if(!changeBySelf)
        return
    console.log("文本改变");
    
    let msg={
        uid:guid,
        opts:editor.operations.filter((x:any)=>x.type!="set_selection")
    }
    let operations=JSON.stringify(msg)
    ws.send(operations);
  };

  const handleChange=(event:any)=>{
    notifyTextChange()
  }
  const handleClick = () => {
    console.log("点击更新文字 ");
    let v = [
      {
        type: "paragraph",
        children: [{ text: "新的文字" }],
      },
    ];
    Transforms.insertNodes(editor, v, { at: [0] })
  };

    // 将 Slate.js 数据保存为 JSON 字符串
    const saveToJSON = () => {
        const jsonValue = JSON.stringify(text);
        // 这里可以将 jsonValue 保存到文件或数据库
        console.log('Saved JSON:', jsonValue);
      };
    
  return (
    <>
    <button onClick={saveToJSON}>Save to JSON</button>
    <Slate editor={editor} initialValue={text} onChange={handleChange}>
      <button onMouseDown={handleClick}>更新文字</button>
      <Editable onKeyDown={(event:any) => {
        changeBySelf=true
            if (event.key === '&') {
                event.preventDefault()
                editor.insertText('and')
            }
        }}/>
    </Slate>
    </>
  );
};

export default MyEditor;
