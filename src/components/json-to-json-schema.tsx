"use client";
import React, { useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import { Draft07 } from "json-schema-library";
import { Button } from "@/components/ui/button";
import { FiCopy } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { PiMagicWand } from "react-icons/pi";
import { RxDoubleArrowRight } from "react-icons/rx";
import { ThemeContext } from "@/context/theme-context";
import { StorageContext } from "@/context/storage-context";
import { isJsonString } from "@/utils";
import { useCommon } from "@/hooks";
const JsonToJsonSchema = () => {
  const [isCopiedToClipboard, setIsCopiedToClipboard] = React.useState(false);
  const { theme } = useContext(ThemeContext);
  const { data, addItem, removeItem } = useContext(StorageContext) ?? {};
  const { handleBeautify } = useCommon();

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
    addItem?.("converter.data", value!);
    removeItem?.({ keyPath: "converter.schema" });
  };

  const handleConvert = () => {
    const jsonSchema = new Draft07();
    const schema = jsonSchema.createSchemaOf(
      JSON.parse(data?.converter?.data ?? "")
    );
    addItem?.("converter.schema", JSON.stringify(schema, null, 2));
  };

  const handleClear = () => {
    removeItem?.({
      key: "converter",
    });
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
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1fr_30px_1fr]">
        <div className="min-h-[50vh]">
          <div className="flex justify-between items-center">
            <h2 className="text-md text-teal-600 font-semibold mb-1">JSON</h2>
            {data?.converter?.data &&
              isJsonString(data?.converter?.data ?? "") && (
                <div
                  className="tooltip cursor-pointer text-teal-600"
                  data-tip="Beautify"
                  onClick={() =>
                    handleBeautify("converter.data", data?.converter?.data)
                  }
                >
                  <PiMagicWand size={22} />
                </div>
              )}
          </div>
          <Editor
            height="50vh"
            value={data?.converter?.data ?? ""}
            defaultLanguage="json"
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={options}
            loading={<span className="loading loading-ring loading-lg"></span>}
            onChange={handleEditorChange}
            className={`rounded-md border-2 ${
              data?.converter?.data?.trim() === "" ||
              isJsonString(data?.converter?.data ?? "")
                ? ""
                : "border-red-500"
            }`}
          />
        </div>
        <div className="hidden text-purple-500 lg:flex lg:justify-center lg:items-center">
          <RxDoubleArrowRight size="24" />
        </div>
        <div className="p-0 order-3 lg:order-2">
          <div className="flex justify-between items-center">
            <h2 className="text-md text-teal-600 font-semibold mb-1">
              JSON Schema
            </h2>
            {data?.converter?.schema && (
              <div>
                {isJsonString(data?.converter?.schema ?? "") && (
                  <div
                    className="tooltip cursor-pointer text-teal-600 mr-4"
                    data-tip="Beautify"
                    onClick={() =>
                      handleBeautify(
                        "converter.schema",
                        data?.converter?.schema
                      )
                    }
                  >
                    <PiMagicWand size={22} />
                  </div>
                )}
                <div
                  className="tooltip cursor-pointer text-teal-600 mr-4"
                  data-tip="Clear"
                  onClick={() => {
                    removeItem?.({ keyPath: "converter.schema" });
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
                    navigator.clipboard.writeText(
                      data?.converter?.schema ?? ""
                    );
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
            value={data?.converter?.schema ?? ""}
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
        <div className="mt-3 mb-4 flex justify-start items-center order-2 lg:order-3">
          <Button
            variant="default"
            className="mr-4"
            onClick={handleConvert}
            disabled={
              !isJsonString(data?.converter?.data ?? "") ||
              data?.converter?.data?.trim() === ""
            }
          >
            Convert To JSON Schema
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={data?.converter?.data?.trim() === ""}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JsonToJsonSchema;
