import React, { useContext } from "react";
import Editor from "@monaco-editor/react";
import { ThemeContext } from "@/context/theme-context";
import { isJsonString } from "@/utils";
import { Draft2019, JsonError, JsonSchema } from "json-schema-library";

const ValidateJsonSchema = () => {
  const [code, setCode] = React.useState("");
  const [jsonData, setJsonData] = React.useState("");
  const { theme } = useContext(ThemeContext);
  const [isError, setIsError] = React.useState(false);
  const [isValidated, setIsValidated] = React.useState(false);
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
    const schema: JsonSchema = JSON.parse(code);
    const jsonSchema = new Draft2019(schema);
    const data = JSON.parse(jsonData);
    const errors: JsonError[] = jsonSchema.validate(data);
    setIsError(!!errors?.length);
    setIsValidated(true);
  };

  const handleJsonSchemaChange = (value: string | undefined) => {
    setCode(value!);
    setIsError(false);
    setIsValidated(false);
  };

  const handleJsonDataChange = (value: string | undefined) => {
    setJsonData(value!);
    setIsError(false);
    setIsValidated(false);
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-[1fr_1fr]">
        <div className="min-h-[50vh]">
          <h2 className="text-md text-teal-600 font-semibold mb-1">
            JSON Schema
          </h2>
          <Editor
            height="50vh"
            value={code!}
            defaultLanguage="json"
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={options}
            loading={<span className="loading loading-ring loading-lg"></span>}
            className={`rounded-md border-2 ${
              code?.trim() === "" || isJsonString(code!) ? "" : "border-red-500"
            }`}
            onChange={handleJsonSchemaChange}
          />
        </div>
        <div className="min-h-[50vh]">
          <h2 className="text-md text-teal-600 font-semibold mb-1">
            JSON Data
          </h2>
          <Editor
            height="50vh"
            value={jsonData!}
            defaultLanguage="json"
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={options}
            loading={<span className="loading loading-ring loading-lg"></span>}
            className={`rounded-md border-2 ${
              code?.trim() === "" || isJsonString(code!) ? "" : "border-red-500"
            }`}
            onChange={handleJsonDataChange}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-start items-center">
        <button
          className="btn btn-primary bg-teal-600 text-white border-teal-600 hover:bg-teal-600 hover:border-teal-600 min-h-fit h-[40px]"
          onClick={handleValidate}
          disabled={code?.trim() === "" || !isJsonString(code!)}
        >
          Validate JSON Schema
        </button>
        <button
          className="btn btn-outline text-teal-600 hover:bg-teal-600 hover:border-teal-600  min-h-fit h-[40px] ml-3"
          onClick={() => setCode("")}
          disabled={code?.trim() === ""}
        >
          Clear
        </button>
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
