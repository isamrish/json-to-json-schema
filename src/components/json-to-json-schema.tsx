"use client";
import React, { useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Clipboard, Check, Eraser } from "lucide-react";
import { PiMagicWand } from "react-icons/pi";
import { RxDoubleArrowRight } from "react-icons/rx";
import { ConfigContext } from "@/context/config-context";
import { StorageContext } from "@/context/storage-context";
import { isJsonString, toCapitalize } from "@/lib/utils";
import { getDraftInstance } from "@/lib/draft";
import { useCommon } from "@/hooks";
import levels from "@/data";
import { JTooltip } from "./tooltip";

const JsonToJsonSchema = () => {
  const [isCopiedToClipboard, setIsCopiedToClipboard] = React.useState(false);
  const { editorTheme, draft } = useContext(ConfigContext);
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
    const jsonSchema = getDraftInstance(draft);
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

  const handleSelect = (res: string) => {
    addItem?.("converter.data", JSON.stringify(levels[res]?.data, null, 2));
    removeItem?.({ keyPath: "converter.schema" });
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
      {Object?.keys(levels)?.map((res) => {
        return (
          <Button
            variant="outline"
            className="mr-3 mb-3 text-blue-600"
            onClick={() => handleSelect(res)}
            key={res}
          >
            {toCapitalize(levels[res]?.label)}
          </Button>
        );
      })}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-[1fr_20px_1fr] mt-3 ">
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
            theme={editorTheme}
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
        <div className="hidden text-purple-500 md:flex lg:justify-center md:items-center">
          <RxDoubleArrowRight size="24" />
        </div>
        <div className="p-0 order-4 md:order-3">
          <div className="flex justify-between items-center">
            <h2 className="text-md text-teal-600 font-semibold mb-1">
              JSON Schema
            </h2>
            {data?.converter?.schema && (
              <div className="flex">
                {isJsonString(data?.converter?.schema ?? "") && (
                  <JTooltip
                    title="Beautify"
                    trigger={
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
                    }
                  />
                )}

                <JTooltip
                  title="Clear"
                  trigger={
                    <div
                      className="tooltip cursor-pointer text-teal-600 mr-4"
                      onClick={() => {
                        removeItem?.({ keyPath: "converter.schema" });
                      }}
                    >
                      <Eraser size={18} />
                    </div>
                  }
                />
                <JTooltip
                  title={isCopiedToClipboard ? "Copied" : "Copy to clipboard"}
                  trigger={
                    <div
                      className="tooltip cursor-pointer text-teal-600"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          data?.converter?.schema ?? ""
                        );
                        setIsCopiedToClipboard(true);
                      }}
                    >
                      {isCopiedToClipboard ? (
                        <Check size={18} />
                      ) : (
                        <Clipboard size={18} />
                      )}
                    </div>
                  }
                />
              </div>
            )}
          </div>
          <Editor
            height="50vh"
            value={data?.converter?.schema ?? ""}
            defaultLanguage="json"
            theme={editorTheme}
            options={{
              ...options,
              readOnly: true,
            }}
            loading={<span className="loading loading-ring loading-lg"></span>}
            className="rounded-md border-2 bg-gray-500"
          />
        </div>
        <div className="mt-3 mb-4 flex justify-start items-center order-3 md:order-4">
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
