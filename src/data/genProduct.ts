import { generateProductCSV } from "./auto-generator";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";
import { Products } from "../models/products";

export const generateProducts = async () => {
  try {
    await generateProductCSV();
    const dataFile = getCSVFiles("products");
    console.log(dataFile, "filee");
    const { header, content } = await getContentCSVFiles(dataFile, ";");
    const dataSeed: {
      productCode: string;
      productName: string;
      productLine: string;
      quantityInStock: number;
      textDescription: string;
      buyPrice: number;
      sellPrice: number;
      image: string;
    }[] = [];
    content.map(async (line) => {
      if (line == "") return;
      const field = cleanField(line.split(";"));
      const item = {
        productCode: field[header.indexOf("productCode")],
        productName: field[header.indexOf("productName")],
        productLine: field[header.indexOf("productLine")],
        quantityInStock: Number(field[header.indexOf("quantityInStock")]),
        textDescription: field[header.indexOf("textDescription")],
        buyPrice: Number(field[header.indexOf("buyPrice")]),
        sellPrice: Number(field[header.indexOf("sellPrice")]),
        image: field[header.indexOf("image")],
      };
      dataSeed.push(item);
    });
    await Products.sync({ force: false })
      .then(() => {
        return Products.bulkCreate(dataSeed);
      })
      .catch((err) => console.log({ "products seed Err": err }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err.toString());
  }
};
