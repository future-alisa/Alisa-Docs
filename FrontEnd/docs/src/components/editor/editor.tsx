//this is important, because we need to point out the component is client or server one while rendering.
"use client";
import MySocket from "../../websocket/MySocket";
import { Guid } from "guid-typescript";

import React, { useState } from "react";
import { createEditor, Transforms, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

// const onChange = (event:[{type:string,children:any}]) => {
//     console.log(event[0].type)
//     console.log(event[0].children[0].text)
//     let text=event[0].children[0].text
//     ws.send(text)
// };

const MyEditor = () => {
  const guid = Guid.create();
  const ws = new MySocket("ws://localhost:8080/websocket/" + guid);

  const listener = (event: any ) => {
    console.log("接收到消息" + event);
    // 渲染editor
    setText(event)
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
  const handleTextChange = (newText: any) => {
    console.log("文本改变");
    ws.send(newText);
  };

  const handleClick = () => {
    console.log("点击更新文字 ");
    let v = [
      {
        type: "paragraph",
        children: [{ text: "新的文字" }],
      },
    ];
    setText(v);
  };
  return (
    <Slate editor={editor} initialValue={text} onChange={handleTextChange}>
      <button onMouseDown={handleClick}>更新文字</button>
      <Editable />
    </Slate>
  );
};

export default MyEditor;
