interface PasswordResetStore {
  email: string;
  newPassword: string;
  confirmPassword: string;
  verificationCode: string;
  showVerificationForm: boolean;
  showNewPasswordForm: boolean;
  error: string;
  setEmail: (email: string) => void;
  setNewPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setVerificationCode: (code: string) => void;
  setShowVerificationForm: (show: boolean) => void;
  setShowNewPasswordForm: (show: boolean) => void;
  setError: (error: string) => void;
}

export type { PasswordResetStore };
