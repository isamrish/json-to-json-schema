import React, { useContext, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { ThemeContext } from "@/context/theme-context";
import { isJsonString } from "@/utils";
import { Draft2019, JsonError, JsonSchema } from "json-schema-library";
import { Button } from "@/components/ui/button";
import { StorageContext } from "@/context/storage-context";
import { SchemaWithData } from "@/types";
import { PiMagicWand } from "react-icons/pi";
import { useCommon } from "@/hooks";

const ValidateJsonSchema = () => {
  const { theme } = useContext(ThemeContext);
  const { handleBeautify } = useCommon();
  const [isError, setIsError] = React.useState(false);
  const [isValidated, setIsValidated] = React.useState(false);
  const { data, addItem, removeItem } = useContext(StorageContext) ?? {};

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

  const handleValidate = () => {
    const schema: JsonSchema = JSON.parse(data?.validator?.schema ?? "");
    const jsonSchema = new Draft2019(schema);
    const _data = JSON.parse(data?.validator?.data ?? "");
    const errors: JsonError[] = jsonSchema.validate(_data);
    setIsError(!!errors?.length);
    setIsValidated(true);
  };

  const handleJsonSchemaChange = (value: string | undefined) => {
    addItem?.("validator.schema", value!);
    setIsError(false);
    setIsValidated(false);
  };

  const handleJsonDataChange = (value: string | undefined) => {
    addItem?.("validator.data", value!);
    setIsError(false);
    setIsValidated(false);
  };

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (isValidated) {
      timerId = setTimeout(() => {
        setIsValidated(false);
      }, 2000);
    }
    return () => clearTimeout(timerId);
  }, [isValidated]);

  return (
    <>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="min-h-[50vh]">
          <div className="flex justify-between items-center">
            <h2 className="text-md text-teal-600 font-semibold mb-1">
              JSON Schema
            </h2>
            {data?.validator?.schema &&
              isJsonString(data?.validator?.schema ?? "") && (
                <div
                  className="tooltip cursor-pointer text-teal-600"
                  data-tip="Beautify"
                  onClick={() =>
                    handleBeautify("validator.schema", data?.validator?.schema)
                  }
                >
                  <PiMagicWand size={22} />
                </div>
              )}
          </div>
          <Editor
            height="50vh"
            value={data?.validator?.schema ?? ""}
            defaultLanguage="json"
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={options}
            loading={<span className="loading loading-ring loading-lg"></span>}
            className={`rounded-md border-2 ${
              data?.validator?.schema?.trim() === "" ||
              isJsonString(data?.validator?.schema ?? "")
                ? ""
                : "border-red-500"
            }`}
            onChange={handleJsonSchemaChange}
          />
        </div>
        <div className="min-h-[50vh]">
          <div className="flex justify-between items-center">
            <h2 className="text-md text-teal-600 font-semibold mb-1">
              JSON Data
            </h2>
            {data?.validator?.data &&
              isJsonString(data?.validator?.data ?? "") && (
                <div
                  className="tooltip cursor-pointer text-teal-600"
                  data-tip="Beautify"
                  onClick={() =>
                    handleBeautify("validator.data", data?.validator?.data)
                  }
                >
                  <PiMagicWand size={22} />
                </div>
              )}
          </div>
          <Editor
            height="50vh"
            value={data?.validator?.data ?? ""}
            defaultLanguage="json"
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={options}
            loading={<span className="loading loading-ring loading-lg"></span>}
            className={`rounded-md border-2 ${
              data?.validator?.data?.trim() === "" ||
              isJsonString(data?.validator?.data ?? "")
                ? ""
                : "border-red-500"
            }`}
            onChange={handleJsonDataChange}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-start items-center">
        <Button
          variant="default"
          className="mr-4"
          onClick={handleValidate}
          disabled={
            Boolean(data?.validator) &&
            (["schema", "data"] as Array<keyof SchemaWithData>).some(
              (key) =>
                data?.validator?.[key]?.trim() === "" ||
                !isJsonString(data?.validator?.[key] ?? "")
            )
          }
        >
          Validate JSON Schema
        </Button>
        <Button
          variant="outline"
          onClick={() => removeItem?.({ key: "validator" })}
          disabled={
            Boolean(data?.validator) &&
            (data?.validator?.schema?.trim() === "" ||
              data?.validator?.data?.trim() === "")
          }
        >
          Clear
        </Button>
      </div>
      {isValidated && (
        <div className="my-4 flex justify-start items-center">
          {isError ? (
            <p className="text-red-500">No valid schema</p>
          ) : (
            <p className="text-green-500">Valid schema</p>
          )}
        </div>
      )}
    </>
  );
};

export default ValidateJsonSchema;
