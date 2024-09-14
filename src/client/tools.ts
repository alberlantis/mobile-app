export enum HTML_METHOD {
  GET = "get",
  PUT = "put",
  POST = "post",
}

export function getHeaders(type: string) {
  return {
    "Content-Type": type,
  };
}
