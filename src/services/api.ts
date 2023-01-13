import axios from "axios";

const baseURL = "https://634eb5f1f34e1ed8269421dd.mockapi.io/api/v1";

const api = axios.create({
  baseURL: "",
});

type GetUrl = {
  route: string;
  params?: any;
  noDefautHeaders?: boolean;
  external?: boolean;
};

type HttpGetProps = {
  route: string;
  params?: object;
  noDefautHeaders?: boolean;
  external?: boolean;
  token?: boolean;
};

type HttpPostProps = {
  route: string;
  params?: object;
  noDefautHeaders?: boolean;
  external?: boolean;
  body?: any;
  token?: boolean;
};

type HttpPutProps = {
  route: string;
  params?: object;
  noDefautHeaders?: boolean;
  external?: boolean;
  body?: any;
  token?: boolean;
};

type HttpDeleteProps = {
  route: string;
  params?: object;
  noDefautHeaders?: boolean;
  external?: boolean;
  token?: boolean;
};

type HttpPatchProps = {
  route: string;
  params?: object;
  noDefautHeaders?: boolean;
  external?: boolean;
  body?: any;
  token?: boolean;
};

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const getHeaders = (token: boolean, noDefaultHeaders: boolean) => {
  if (token) {
    const tokenString = localStorage.getItem("token");

    const headers = noDefaultHeaders ? {} : defaultHeaders;

    return {
      ...headers,
      Authorization: `Bearer ${tokenString}`,
    };
  } else {
    return defaultHeaders;
  }
};

const getUrl = (props: GetUrl): string => {
  const { route, params, external = false } = props;

  const url = external ? route : `${baseURL}/${route}`;

  let urlString = url;

  if (params) {
    urlString += "?";

    const paramsArr = Object.keys(params).map((key) => {
      return `${key}=${params[key]}`;
    });

    urlString += paramsArr.join("&");
  }

  return urlString;
};

const HttpGet = async <T = any>(props: HttpGetProps) => {
  const { token = false, noDefautHeaders } = props;

  const headers = getHeaders(token, noDefautHeaders ?? false);

  const url = getUrl(props);

  return api.get<T>(url, {
    headers,
  });
};

const HttpPost = async <T = any>(props: HttpPostProps) => {
  const { body = {}, token = false, noDefautHeaders } = props;

  const headers = getHeaders(token, noDefautHeaders ?? false);

  const url = getUrl(props);

  return api.post<T>(url, body, {
    headers,
  });
};

const HttpPut = async <T = any>(props: HttpPutProps) => {
  const { body = {}, token = false, noDefautHeaders } = props;

  const headers = getHeaders(token, noDefautHeaders ?? false);

  const url = getUrl(props);

  return api.put<T>(url, body, {
    headers,
  });
};

const HttpDelete = async <T = any>(props: HttpDeleteProps) => {
  const { token = false, noDefautHeaders } = props;

  const headers = getHeaders(token, noDefautHeaders ?? false);

  const url = getUrl(props);

  return api.delete<T>(url, {
    headers,
  });
};

const HttpPatch = async <T = any>(props: HttpPatchProps) => {
  const { body = {}, token = false, noDefautHeaders } = props;

  const headers = getHeaders(token, noDefautHeaders ?? false);

  const url = getUrl(props);

  return api.patch<T>(url, body, {
    headers,
  });
};

const ApiService = {
  HttpGet,
  HttpPost,
  HttpPut,
  HttpDelete,
  HttpPatch,
};

export default ApiService;
