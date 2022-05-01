import { generateProductCSV } from "./auto-generator";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";
import { ProductLines } from "../models/productLines";

export const generateProductLine = async () => {
  try {
    const file = await getCSVFiles("productLine");
    const { header, content } = await getContentCSVFiles(file, ";");
    const dataSeed: {
      productLine: string;
      productLineName: string;
      textDescription: any;
    }[] = [];
    content.map((line) => {
      const field = line.split(";");
      cleanField(field);
      const productLine = field[header.indexOf("productLine")];
      const productLineName = field[header.indexOf("productLineName")];
      const textDescription = field[2];
      const item = {
        productLine,
        productLineName,
        textDescription,
      };
      dataSeed.push(item);
    });
    await ProductLines.sync({ force: false })
      .then(() => {
        return ProductLines.bulkCreate(dataSeed);
      })
      .catch((err) => console.log({ "ProductLine Seed Err": err }));
  } catch (err: any) {
    throw new Error(err.toString());
  }
};
