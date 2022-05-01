import path from "path";
import { readFile } from "./auto-generator";
export const getCSVFiles = (fileName: string) => {
  const dir = path.join(__dirname, "seed-data");
  return dir + `/${fileName}.csv`;
};
export const getContentCSVFiles = async (file: string, deli = ";") => {
  const lines = await readFile(file);
  let oneLine = [];
  oneLine = lines.split("\n");
  return {
    header: oneLine[0].split(deli),
    content: oneLine.slice(1),
  };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanField = (field: any) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field.map((item: any) => item.replace(/(\r\n|\n|\r)/gm, ""));
