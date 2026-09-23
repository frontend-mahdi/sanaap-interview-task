export class ApiError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly errorDetails: unknown;

  constructor(
    message: string,
    status: number,
    errorDetails?: unknown,
    code?: string
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorDetails = errorDetails;
    this.code = code;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: object;
  params?: Record<string, string | number | undefined>;
}

export async function apiClient<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, params, headers, ...rest } = options;

  const finalUrl = new URL(url);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        finalUrl.searchParams.set(key, String(value));
      }
    });
  }

  let response: Response;
  try {
    response = await fetch(finalUrl.toString(), {
      headers: { "Content-Type": "application/json", ...(headers ?? {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
      ...rest,
    });
  } catch {
    throw new ApiError("خطا در برقراری ارتباط با سرور", 0);
  }

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    const errorDetails = json?.error_details;
    throw new ApiError(
      errorDetails?.fa_details ?? json?.message ?? "خطای نامشخص از سرور",
      response.status,
      errorDetails,
      errorDetails?.code
    );
  }

  return json as T;
}