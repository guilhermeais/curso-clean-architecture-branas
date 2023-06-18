export interface UseCase<Request=any, Response = any> {
  execute(params: Request): Promise<Response>
}