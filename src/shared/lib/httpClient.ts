import { API_BASE_URL } from './apiConfig'

class ApiError extends Error {
  status: number
  responseBody?: unknown

  constructor(status: number, message: string, responseBody?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.responseBody = responseBody
  }
}

function buildHeaders(options: RequestInit): Record<string, string> {
  const headers: Record<string, string> = {}
  const existingHeaders = new Headers(options.headers)

  const isJsonBody =
    options.body != null &&
    !(options.body instanceof FormData) &&
    !(options.body instanceof URLSearchParams)

  if (isJsonBody && !existingHeaders.has('Content-Type')) {
    headers['Content-Type'] = 'application/json'
  }

  existingHeaders.forEach((value, key) => {
    headers[key] = value
  })

  return headers
}

async function parseErrorBody(response: Response): Promise<string> {
  try {
    const body = await response.json()
    if (typeof body?.error === 'string') return body.error
    if (typeof body?.message === 'string') return body.message
    return response.statusText || 'Error desconocido'
  } catch {
    return response.statusText || 'Error desconocido'
  }
}

export async function httpClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(options),
  })

  if (!response.ok) {
    const message = await parseErrorBody(response)
    throw new ApiError(response.status, message)
  }

  return response.json() as Promise<T>
}

export { ApiError }
