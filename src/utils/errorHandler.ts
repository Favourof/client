import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ErrorResponse {
  message: string;
  errors?: Array<{ field?: string; message: string }>;
}

export function handleAxiosError(
  error: unknown,
  fallbackMessage = "Something went wrong",
): void {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse;

    // Handle validation errors (array of errors)
    if (data?.errors && data.errors.length > 0) {
      data.errors.forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    // Handle single error message
    const message = data?.message || fallbackMessage;
    toast.error(message);
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else {
    toast.error(fallbackMessage);
  }
}
