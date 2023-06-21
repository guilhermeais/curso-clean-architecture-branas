import HttpClient, { Options } from "../http/HttpClient";
import axios from 'axios'

export default class AxiosAdapter implements HttpClient {
  async get<T = any>(url: string, options?: Options | undefined): Promise<T> {
    const result = await axios.get<T>(url, options)

    return result.data
  }

  async post<Req = any, Res = any>(url: string, body: Req, options?: Options | undefined): Promise<Res> {
    const result = await axios.post<Req>(url, body, options)

    return result.data as any as Res
  }

}