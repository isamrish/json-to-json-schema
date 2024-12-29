import React from "react";
import JsonToJsonSchema from "./json-to-json-schema";

const PlayGround = () => {
  const [tab, setTab] = React.useState("jsontojsonschema");
  return (
    <>
      <div role="tablist" className="tabs tabs-lifted max-w-full block">
        <a
          role="tab"
          className={`tab  max-w-[200px] border-0 ${
            tab === "jsontojsonschema" ? "tab-active" : ""
          }`}
          onClick={() => setTab("jsontojsonschema")}
        >
          <p
            className={`mb-0 ${
              tab === "jsontojsonschema" ? "font-black" : "font-normal"
            }`}
          >
            JSON TO JSON SCHEMA
          </p>
        </a>
        <a
          role="tab"
          className={`tab border-0 ${
            tab === "validateschema"
              ? "tab-active"
              : "inline-block w-[calc(100%-200px)] max-w-full text-left"
          }`}
          onClick={() => setTab("validateschema")}
        >
          <p
            className={`mb-0 ${
              tab === "validateschema" ? "font-black" : "font-normal"
            }`}
          >
            VALIDATE SCHEMA
          </p>{" "}
        </a>
      </div>
      {tab === "jsontojsonschema" && (
        <div className="mt-6">
          <h2 className="pt-3 text-2xl font-semibold">
            JSON TO JSON SCHEMA CONVERTER{" "}
          </h2>
          <p className="pb-3 text-md font-normal">
            Transform your JSON into precise JSON Schemas with ease.
          </p>
          <JsonToJsonSchema />
        </div>
      )}
    </>
  );
};

export default PlayGround;
