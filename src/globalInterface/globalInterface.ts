export type TLoginUser = {
  email: string;
  password: string;
};


export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessage: string
  };