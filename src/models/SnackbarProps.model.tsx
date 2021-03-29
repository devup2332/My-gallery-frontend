export interface SnackbarProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  timer: NodeJS.Timeout;
}
