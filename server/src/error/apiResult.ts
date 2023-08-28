import { ErrorCode } from 'src/enum/errorCode.enum';

type SuccessResult<T> = T extends void
  ? { success: true }
  : { success: true; data: T };

type FailResult = {
  success: false;
  errorCode: ErrorCode;
  message: string;
};

export type ApiResult<T> = SuccessResult<T> | FailResult;
