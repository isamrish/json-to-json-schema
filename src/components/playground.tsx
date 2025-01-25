import React from "react";
import JsonToJsonSchema from "./json-to-json-schema";
import ValidateJsonSchema from "./validate-json-schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PlayGround = () => {
  return (
    <Tabs defaultValue="jsontojsonschema" className="w-full">
      <div className="w-full bg-gray-100 rounded-md py-2">
        <TabsList className="grid w-[280px] grid-cols-2 px-2">
          <TabsTrigger value="jsontojsonschema">CONVERTER</TabsTrigger>
          <TabsTrigger value="validateschema">VALIDATOR</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="jsontojsonschema">
        <div className="my-6">
          <h2 className="pt-3 text-2xl font-semibold">
            JSON TO JSON SCHEMA CONVERTER{" "}
          </h2>
          <p className="pb-3 text-md font-normal">
            Transform your JSON into precise JSON Schemas with ease.
          </p>
          <JsonToJsonSchema />
        </div>
      </TabsContent>
      <TabsContent value="validateschema">
        <div className="my-6">
          <h2 className="pt-3 text-2xl font-semibold">
            VALIDATE JSON SCHEMA AGAINST JSON DATA
          </h2>
          <p className="pb-3 text-md font-normal">
            Validate your JSON Schema against JSON Data with ease.
          </p>
          <ValidateJsonSchema />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PlayGround;
