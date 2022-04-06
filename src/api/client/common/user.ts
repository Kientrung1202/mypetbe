import User from "../../../models/user";

export const findUserByUserName = (userName: string) => {
  return User.findOne({
    where: {
      userName,
    },
  })
    .then((result) => {
      return result;
    })
    .catch((err: Error) => {
      console.log(err);
    });
};
