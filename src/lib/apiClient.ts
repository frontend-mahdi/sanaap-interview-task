export class ApiError extends Error {
  public readonly status: number;
  public readonly errorDetails: unknown;

  constructor(message: string, status: number, errorDetails?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorDetails = errorDetails;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: Record<string, unknown>;
  params?: Record<string, string>;
}

export async function apiClient<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, params, headers, ...rest } = options;

  const finalUrl = new URL(url);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") finalUrl.searchParams.set(key, value);
    });
  }

  let response: Response;
  try {
    response = await fetch(finalUrl.toString(), {
      headers: {
        "Content-Type": "application/json",
        ...(headers ?? {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      ...rest,
    });
  } catch {
    throw new ApiError("خطا در برقراری ارتباط با سرور", 0);
  }

  const json = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      json?.error_details?.fa_details ?? "خطای نامشخص",
      response.status,
      json?.error_details
    );
  }

  return json as T;
}