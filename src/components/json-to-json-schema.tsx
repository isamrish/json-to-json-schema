"use client";
import React, { useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import { Draft07 } from "json-schema-library";
import { FiCopy } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { ThemeContext } from "@/context/theme-context";
import { isJsonString } from "@/utils";

const JsonToJsonSchema = () => {
  const [json, setJson] = React.useState<string | null>("");
  const [outputCode, setOutputCode] = React.useState<string | null>("");
  const [isCopiedToClipboard, setIsCopiedToClipboard] = React.useState(false);
  const { theme } = useContext(ThemeContext);

  const options = {
    fontSize: "14px",
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false,
    },
    lineNumbersMinChars: 3,
    tabSize: 2,
    padding: {
      top: "6px",
      bottom: "6px",
    },
    renderLineHighlight: "none",
  };

  const handleEditorChange = (value: string | undefined) => {
    setJson(value!);
  };

  const handleConvert = () => {
    const jsonSchema = new Draft07();
    const schema = jsonSchema.createSchemaOf(JSON.parse(json!));
    setOutputCode(JSON.stringify(schema, null, 2));
  };

  const handleReset = () => {
    setJson("");
    setOutputCode("");
  };

  useEffect(() => {
    if (isCopiedToClipboard) {
      setTimeout(() => {
        setIsCopiedToClipboard(false);
      }, 2000);
    }
  }, [isCopiedToClipboard]);

  return (
    <div className="mt-0">
      <div className="grid gap-4 grid-cols-[1fr_1fr]">
        <div className="min-h-[50vh]">
          <h2 className="text-md text-teal-600 font-semibold mb-1">JSON</h2>
          <Editor
            height="50vh"
            value={json!}
            defaultLanguage="json"
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={options}
            loading={<span className="loading loading-ring loading-lg"></span>}
            onChange={handleEditorChange}
            className={`rounded-md border-2 ${
              json?.trim() === "" || isJsonString(json!) ? "" : "border-red-500"
            }`}
          />
        </div>
        <div className="p-0">
          <div className="flex justify-between items-center">
            <h2 className="text-md text-teal-600 font-semibold mb-1">
              JSON Schema
            </h2>
            {outputCode && (
              <div>
                <div
                  className="tooltip cursor-pointer text-teal-600 mr-4"
                  data-tip="Clear"
                  onClick={() => {
                    setOutputCode("");
                  }}
                >
                  <AiOutlineClear size={22} />
                </div>
                <div
                  className="tooltip cursor-pointer text-teal-600"
                  data-tip={
                    isCopiedToClipboard ? "Copied" : "Copy to clipboard"
                  }
                  onClick={() => {
                    navigator.clipboard.writeText(outputCode!);
                    setIsCopiedToClipboard(true);
                  }}
                >
                  <FiCopy size={18} />
                </div>
              </div>
            )}
          </div>
          <Editor
            height="50vh"
            value={outputCode!}
            defaultLanguage="json"
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={{
              ...options,
              readOnly: true,
            }}
            loading={<span className="loading loading-ring loading-lg"></span>}
            className="rounded-md border-2 bg-gray-500"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-start items-center">
        <button
          className="btn btn-primary bg-teal-600 text-white border-teal-600 hover:bg-teal-600 hover:border-teal-600 min-h-fit h-[40px]"
          onClick={handleConvert}
          disabled={!isJsonString(json!) || json?.trim() === ""}
        >
          Convert To JSON Schema
        </button>
        <button
          className="btn btn-outline text-teal-600 hover:bg-teal-600 hover:border-teal-600  min-h-fit h-[40px] ml-3"
          onClick={handleReset}
          disabled={json?.trim() === ""}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default JsonToJsonSchema;
