import type { IFieldMeta } from "@lark-base-open/js-sdk";

export type IFieldMetaWithValue = IFieldMeta & { value: any }

export type IFieldMetaSettings = {
  fieldId: string;
  name: string;
  oneLine: boolean;
  hidden: boolean;
}
