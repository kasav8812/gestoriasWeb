export interface AuthResponse {
  success: boolean;
  expired?: string;
  token?: string;
  name?: string;
  roles?: string;
}
