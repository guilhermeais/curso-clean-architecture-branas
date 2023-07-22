export default interface HttpClient {
  get<T = any>(url: string, options?: Options): Promise<T>
  post<Req = any, Res = any>(url: string, body: Req, options?: Options): Promise<Res>
}

export type Options = { headers?: Record<string, string> }
