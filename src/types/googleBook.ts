// Google Books APIのレスポンスの型定義
export interface GoogleBooksApiResponse {
  kind: string;
  totalItems: number;
  items: GoogleBooksVolume[];
}

export interface GoogleBooksVolume {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
}

export interface VolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifier[];
  readingModes?: ReadingModes;
  pageCount?: number;
  printType?: string;
  categories?: string[];
  maturityRating?: string;
  allowAnonLogging?: boolean;
  contentVersion?: string;
  panelizationSummary?: PanelizationSummary;
  imageLinks?: ImageLinks;
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
}

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: EpubPdfInfo;
  pdf: EpubPdfInfo;
  webReaderLink?: string;
  accessViewStatus: string;
  quoteSharingAllowed?: boolean;
}

export interface EpubPdfInfo {
  isAvailable: boolean;
  acsTokenLink?: string;
}

export interface SearchInfo {
  textSnippet: string;
}

// Google Books APIのid検索時のレスポンスの型定義
export type GoogleBooksApiResponseById = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
    readingModes: {
      text: boolean;
      image: boolean;
    };
    pageCount?: number;
    printedPageCount?: number;
    dimensions?: {
      height?: string;
      width?: string;
    };
    printType: string;
    categories?: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary?: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
      small?: string;
      medium?: string;
      large?: string;
      extraLarge?: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
    };
    pdf: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
  };
};

// エラーレスポンス全体の型
export interface GoogleBooksApiErrorResponse {
  error: GoogleBooksApiError;
}

// エラー情報の型
export interface GoogleBooksApiError {
  code: number; // HTTPステータスコード (例: 429)
  message: string; // エラーメッセージ
  errors: ErrorDetail[]; // 詳細エラー情報
  status: string; // エラーの状態 (例: "RESOURCE_EXHAUSTED")
  details?: ErrorDetails[]; // 詳細情報 (オプショナル)
}

// 詳細エラー情報の型
export interface ErrorDetail {
  message: string; // 詳細メッセージ
  domain: string; // エラーのドメイン (例: "global")
  reason: string; // エラーの理由 (例: "rateLimitExceeded")
}

// エラー詳細情報の型
export interface ErrorDetails {
  "@type": string; // エラーの種類
  reason?: string; // エラーの理由 (例: "RATE_LIMIT_EXCEEDED")
  domain?: string; // ドメイン情報
  metadata?: Metadata; // メタデータ (オプショナル)
  links?: HelpLink[]; // ヘルプリンク情報 (オプショナル)
}

// メタデータの型
export interface Metadata {
  quota_limit_value?: string; // クォータの制限値
  quota_metric?: string; // クォータのメトリクス
  consumer?: string; // プロジェクト情報
  service?: string; // サービス名
  quota_location?: string; // クォータの場所
  quota_limit?: string; // クォータの制限
}

// ヘルプリンクの型
export interface HelpLink {
  description: string; // リンクの説明
  url: string; // リンクURL
}
