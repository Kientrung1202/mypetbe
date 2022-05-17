import fs from "fs";
import { getCSVFiles } from "./scanDataType";

export const isExistFile = async (file: string) =>
  new Promise((resolve, reject) => {
    fs.access(file, fs.constants.F_OK, (error) => {
      if (error) return reject(error);

      resolve(true);
    });
  });

export const readFile = async (file: string): Promise<string> =>
  new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appendFile = async (pathFile: string, data: any) =>
  new Promise((resolve, reject) => {
    fs.appendFile(pathFile, data, (error) => {
      if (error) return reject(error);

      return resolve(true);
    });
  });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const writeFile = async (pathFile: string, data: any) =>
  new Promise((resolve, reject) => {
    fs.writeFile(pathFile, data, (error) => {
      if (error) return reject(error);
      return resolve(true);
    });
  });
export const deleteFirstLine = async (pathFile: string) =>
  new Promise((resolve, reject) => {
    fs.readFile(pathFile, "utf8", (error, data) => {
      if (error) return reject(error);
      const linesExceptFirst = data.split("\n").slice(1).join("\n");
      fs.writeFile(pathFile, linesExceptFirst, (error) => {
        if (error) return reject(error);

        return resolve(true);
      });
    });
  });
export const unlinkFile = async (pathFile: string) =>
  new Promise((resolve, reject) => {
    fs.unlink(pathFile, (error) => {
      if (error) return reject(error);

      resolve(true);
    });
  });

export const generateProductCSV = () => {
  const productType = [
    {
      productLine: "DOG_PA",
      productName: "Pate for dogs",
    },
    {
      productLine: "CAT_PA",
      productName: "Pate for cats",
    },
    {
      productLine: "DOG_KANEL",
      productName: "Kanel for dogs",
    },
    {
      productLine: "CAT_KANEL",
      productName: "Kanel for cats",
    },
    {
      productLine: "CAT_MILK",
      productName: "Milk litle sugar",
    },
  ];
  const link = [
    [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR58wY000Pm5K2B9URYzfksxzbK52qnYnMDeg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQatM0dBcskP4VJ1O00E3UPuRobpiHrvIkutQ&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSER5N7NlNOMz8f6X0TZjQxShjPY4tb6zjeiKoDn_DLjzOEK4L_-aR7kkY2Ocad1d5OWus&usqp=CAU",
    ],
    [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuj0SwCBqi4eUzqIi8cguaVJQFmlH4FhjdZg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUTgTL_MPla2wL4Gpb-i2LPtQI7UlHfaR8A&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLNUNo9g2ihuQ_0U6LY5bflzTX6GS4T56bmw&usqp=CAU",
    ],
    [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKRtYX1N0m5Qrtz7cog21J4W2FaZoxjIEFJw&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_xclmhF_InKW3lXDTB50clf9UQsXGFenYtg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSSySohwv11JT3HCNNXARNEJINYET5WcVd1Q&usqp=CAU",
    ],
    [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxBm45R5kLfHDgkTRUFo0MSS25AVmhLPIO1A&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCTj7-GNo31B1Wo6aCHCDxBBYorwzVFfeqGw&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmI6YV1UEtzbtGmSmPeMPXD1VKPz6hnq26DA&usqp=CAU",
    ],
    [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbgs6yqhU6czdX3jq6LXLgL9jMjY8QVqe2gg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4k2yX_T7qs-cRovQx0BVsSdT-x8L0PgeS5A&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLVxdAbvTVwMMJ63Pza7ZflL9xmlxvlg4L4g&usqp=CAU",
    ],
  ];
  const brand = ["TRUTB", "LAPQN"];
  let result = `productCode;productName;productLine;quantityInStock;textDescription;buyPrice;sellPrice;image\n`;
  for (let i = 0; i < 60; i++) {
    const randomLine = Math.floor(Math.random() * 5); // loai nao
    const number = productType[randomLine];
    const code = i + 1; // ma code bao nhieu
    const productLine = number.productLine;
    const productCode = number.productLine + `_${code}`;
    const productName = number.productName + " " + brand[code % 2];
    const quantityInStock = Math.floor(Math.random() * 1000);
    const textDescription = "This is our affect";
    const buyPrice = Math.floor(Math.random() * 100 + 20);
    const sellPrice = buyPrice * 1.5;
    const randomImage = Math.floor(Math.random() * 3);
    const image = link[randomLine][randomImage];
    const addLine =
      productCode +
      ";" +
      productName +
      ";" +
      productLine +
      ";" +
      quantityInStock +
      ";" +
      textDescription +
      ";" +
      buyPrice +
      ";" +
      sellPrice +
      ";" +
      image;
    result = result + addLine + "\n";
  }
  const pathFile = getCSVFiles("products");
  return new Promise((resolve, reject) => {
    fs.writeFile(pathFile, result, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve(true);
    });
  });
};
