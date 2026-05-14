import { describe, it, expect, vi } from 'vitest'
import { http, HttpResponse } from 'msw'
import { httpClient, ApiError } from './httpClient'
import { server } from '../../test/msw/server'

const API_URL = 'https://dulces-petalos.jakala.es/api'

describe('httpClient', () => {
  it('fetches JSON successfully', async () => {
    server.use(
      http.get(`${API_URL}/test`, () => HttpResponse.json({ ok: true }))
    )
    const data = await httpClient<{ ok: boolean }>('/test')
    expect(data).toEqual({ ok: true })
  })

  it('throws ApiError on HTTP 404', async () => {
    server.use(
      http.get(`${API_URL}/extra`, () =>
        HttpResponse.json({ error: 'Not found' }, { status: 404 })
      )
    )
    try {
      await httpClient('/extra')
      expect.unreachable()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
      expect((err as ApiError).status).toBe(404)
    }
  })

  it('throws ApiError on HTTP 500 with error body', async () => {
    server.use(
      http.get(`${API_URL}/server-error`, () =>
        HttpResponse.json({ message: 'Boom' }, { status: 500 })
      )
    )
    try {
      await httpClient('/server-error')
      expect.unreachable()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
      expect((err as ApiError).status).toBe(500)
      expect((err as ApiError).message).toBe('Boom')
    }
  })

  it('parses error body with "error" field', async () => {
    server.use(
      http.get(`${API_URL}/error-field`, () =>
        HttpResponse.json({ error: 'Something broke' }, { status: 400 })
      )
    )
    try {
      await httpClient('/error-field')
      expect.unreachable()
    } catch (err) {
      expect((err as ApiError).message).toBe('Something broke')
    }
  })

  it('falls back to statusText when body is not JSON', async () => {
    server.use(
      http.get(`${API_URL}/text-error`, () =>
        HttpResponse.text('plain text error', { status: 400 })
      )
    )
    try {
      await httpClient('/text-error')
      expect.unreachable()
    } catch (err) {
      expect(err).toBeInstanceOf(ApiError)
      expect((err as ApiError).status).toBe(400)
    }
  })

  it('does not send Content-Type header on GET requests', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    server.use(
      http.get(`${API_URL}/no-ct`, () => HttpResponse.json({ ok: true }))
    )
    await httpClient('/no-ct')
    const headers = fetchSpy.mock.calls[0]?.[1]?.headers as
      | Record<string, string>
      | undefined
    expect(headers?.['Content-Type']).toBeUndefined()
    fetchSpy.mockRestore()
  })

  it('sends Content-Type header on POST with JSON body', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    server.use(
      http.post(`${API_URL}/post-test`, () => HttpResponse.json({ ok: true }))
    )
    await httpClient('/post-test', {
      method: 'POST',
      body: JSON.stringify({ key: 'value' }),
    })
    const headers = fetchSpy.mock.calls[0]?.[1]?.headers as
      | Record<string, string>
      | undefined
    expect(headers?.['Content-Type']).toBe('application/json')
    fetchSpy.mockRestore()
  })

  it('respects user-provided Content-Type header', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    server.use(
      http.post(`${API_URL}/custom-ct`, () => HttpResponse.json({ ok: true }))
    )
    await httpClient('/custom-ct', {
      method: 'POST',
      body: 'not-json',
      headers: { 'Content-Type': 'text/plain' },
    })
    const headers = fetchSpy.mock.calls[0]?.[1]?.headers as
      | Record<string, string>
      | undefined
    expect(headers?.['content-type']).toBe('text/plain')
    fetchSpy.mockRestore()
  })
})
