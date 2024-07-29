interface EditModeType {
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
}

interface CustomErrorType {
  errorCode: string;
  message: string;
}

export type { EditModeType, CustomErrorType };
