import Users from "../models/user";
import { cleanField, getContentCSVFiles, getCSVFiles } from "./scanDataType";

const genUsers = async () => {
  const pathFile = getCSVFiles("users");
  const { header, content } = await getContentCSVFiles(pathFile, ";");
  const data: {
    userName: string;
    password: string;
    fullName: string;
    phone: string;
    address: string;
    role: number;
  }[] = [];
  const posUserName = header.indexOf("userName");
  const posPw = header.indexOf("password");
  const posName = header.indexOf("fullName");
  const posPhone = header.indexOf("phone");
  const posAddress = header.indexOf("address");
  const posRole = header.indexOf("role\r");
  content.map((oneLine) => {
    const field = oneLine.split(";");
    cleanField(field);
    const userName = field[posUserName];
    const password = field[posPw];
    const phone = field[posPhone];
    const fullName = field[posName];
    const address = field[posAddress];
    const role = Number(field[posRole]);
    const item = {
      userName,
      password,
      fullName,
      phone,
      address,
      role,
    };
    data.push(item);
  });
  await Users.sync({ force: false })
    .then(() => Users.bulkCreate(data))
    .catch((err) => {
      throw new Error(err.toString());
    });
};

export default genUsers;
