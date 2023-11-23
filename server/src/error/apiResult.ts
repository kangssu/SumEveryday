import { ErrorMessage } from 'src/enum/errorMessage.enum';

type SuccessResult<T> = T extends void
  ? { success: true }
  : { success: true; data: T };

type FailResult = {
  success: false;
  errorCode: ErrorMessage;
  message: string;
};

export type ApiResult<T> = SuccessResult<T> | FailResult;
