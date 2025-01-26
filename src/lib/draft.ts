import {
  Draft04,
  Draft06,
  Draft07,
  Draft2019,
  JsonSchema,
} from "json-schema-library";

type AvailableDrafts = Draft04 | Draft06 | Draft07 | Draft2019;

type DraftClassConstructor = new (schema?: JsonSchema) => AvailableDrafts;

const draftMap: Record<string, DraftClassConstructor> = {
  draft07: Draft07,
  draft04: Draft04,
  draft06: Draft06,
  draft2019: Draft2019,
};

const getDraftInstance = (
  key: string,
  schema?: JsonSchema
): AvailableDrafts => {
  const SelectedDraft = draftMap[key];
  if (!SelectedDraft) {
    throw new Error(`Class not found for key: ${key}`);
  }
  if (schema) {
    return new SelectedDraft(schema);
  }
  return new SelectedDraft();
};

export { getDraftInstance };
