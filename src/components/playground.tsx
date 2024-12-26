"use client";
import React from "react";
import Editor from "@monaco-editor/react";

const Playground = () => {
  const [jsonCode, setJSONCode] = React.useState<string | undefined>("");
  const options = {
    selectOnLineNumbers: true,
    fontSize: "14px",
  };

  function handleEditorChange(value: string | undefined) {
    setJSONCode(value);
  }

  return (
    <div className="grid gap-4 grid-cols-[1fr_100px_1fr]">
      <div className="bg-blue-100 min-h-[80vh] rounded-md">
        <h2 className="text-xl text-black py-2 pl-8">JSON</h2>
        <Editor
          height="80vh"
          value={jsonCode}
          defaultLanguage="json"
          theme="vs-dark"
          options={options}
          className="rounded-md"
          onChange={handleEditorChange}
        />
      </div>
      <div className="flex justify-center items-center">
        <button className="btn btn-primary">Convert</button>
      </div>
      <div className="bg-gray-100 p-0 rounded-md">
        <h2 className="text-xl text-black py-2 pl-8">JSON Schema</h2>
        <Editor
          height="80vh"
          value={jsonCode}
          defaultLanguage="json"
          theme="vs-dark"
          options={options}
          className="rounded-md"
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default Playground;
