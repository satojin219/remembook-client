export type ErrorType = {
  error: {
    status: number;
    message: string;
    code: AppError;
  };
};

export enum AppError {
  UNPROCESSABLE_ENTITY = "UnprocessableEntity",
  ENTITY_NOT_FOUND = "EntityNotFound",
  VALIDATION_ERROR = "ValidationError",
  TRANSACTION_ERROR = "TransactionError",
  SPECIFIC_OPERATION_ERROR = "SpecificOperationError",
  NO_ROWS_AFFECTED_ERROR = "NoRowsAffectedError",
  KEY_VALUE_STORE_ERROR = "KeyValueStoreError",
  BCRYPT_ERROR = "BcryptError",
  CONVERT_TO_UUID_ERROR = "ConvertToUuidError",
  OPENAI_ERROR = "OpenAIError",
  COSINE_SIMILARITY_ERROR = "CosineSimilarityError",
  UNAUTHENTICATED_ERROR = "UnauthenticatedError",
  UNAUTHORIZED_ERROR = "UnauthorizedError",
  FORBIDDEN_OPERATION = "ForbiddenOperation",
  CONVERSION_ENTITY_ERROR = "ConversionEntityError",
  INSUFFICIENT_COINS_ERROR = "InsufficientCoinsError",
  INVALID_SESSION_ID_ERROR = "InvalidSessionIdError",
  FAILED_TO_ADD_COIN_ERROR = "FailedToAddCoinError",
  UNKNOWN_ERROR = "UnknownError",
}
export const getErrorMessage = (errorCode: AppError): string => {
  switch (errorCode) {
    case AppError.UNPROCESSABLE_ENTITY:
      return "リクエストを処理できませんでした。";
    case AppError.ENTITY_NOT_FOUND:
      return "リソースが見つかりませんでした。";
    case AppError.VALIDATION_ERROR:
      return "入力内容に誤りがあります。";
    case AppError.TRANSACTION_ERROR:
    case AppError.SPECIFIC_OPERATION_ERROR:
      return "データベース処理中にエラーが発生しました。";
    case AppError.NO_ROWS_AFFECTED_ERROR:
      return "対象データがありませんでした。";
    case AppError.KEY_VALUE_STORE_ERROR:
      return "キー・バリューストア処理中にエラーが発生しました。";
    case AppError.BCRYPT_ERROR:
      return "パスワードのハッシュ化に失敗しました。";
    case AppError.CONVERT_TO_UUID_ERROR:
      return "UUIDへの変換に失敗しました。";
    case AppError.OPENAI_ERROR:
      return "OpenAI APIでエラーが発生しました。";
    case AppError.COSINE_SIMILARITY_ERROR:
      return "コサイン類似度計算中にエラーが発生しました。";
    case AppError.UNAUTHENTICATED_ERROR:
      return "アクセスが拒否されました。ログインしてください。";
    case AppError.UNAUTHORIZED_ERROR:
      return "認証に失敗しました。";
    case AppError.FORBIDDEN_OPERATION:
      return "この操作は許可されていません。";
    case AppError.CONVERSION_ENTITY_ERROR:
      return "エンティティ変換エラーが発生しました。";
    case AppError.INSUFFICIENT_COINS_ERROR:
      return "コインが不足しています。";
    case AppError.INVALID_SESSION_ID_ERROR:
      return "セッションIDが不正です。";
    case AppError.FAILED_TO_ADD_COIN_ERROR:
      return "コインの追加に失敗しました。";
    default:
      return "予期しないエラーが発生しました。";
  }
};
