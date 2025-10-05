import type { IBackendError } from "./errorMessage";

const WS_URL = import.meta.env.PUBLIC_VITE_WS_URL;
const BASE_URL = import.meta.env.PUBLIC_VITE_BASE_URL;

export async function fetchBaseUrlFile<T>(url: string): Promise<T> {
  const response = await fetch(BASE_URL + "/" + url, {
    method: "GET",
    headers: {
      Accept: "application/octet-stream",
      "Content-Type": "application/octet-stream",
    },
  });

  if (response.ok && (response.status === 200 || response.status == 201)) {
    return response.blob() as Promise<T>;
  } else {
    let error: IBackendError = { error: "Error" };
    try {
      error = await response.json();
      //Error if no body
    } catch (ex) {}

    throw new Error(error.error);
  }
}

export async function fetchUrl<T>(url: string): Promise<T> {
  const response = await fetch(
    WS_URL + url + "?lang=" + document.documentElement.lang,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Lang: document.documentElement.lang,
      },
    },
  );
  if (response.ok && (response.status === 200 || response.status == 201)) {
    return response.json() as Promise<T>;
  } else {
    let error: IBackendError = { error: "Error" };
    try {
      error = await response.json();
      //Error if no body
    } catch (ex) {}

    throw new Error(error.error);
  }
}

export async function fetchUrlQueryParam<T>(
  url: string,
  queryParam: string,
): Promise<T> {
  const response = await fetch(
    WS_URL + url + "?lang=" + document.documentElement.lang + "&" + queryParam,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Lang: document.documentElement.lang,
      },
    },
  );

  if (response.ok && (response.status === 200 || response.status == 201)) {
    return response.json() as Promise<T>;
  } else {
    let error: IBackendError = { error: "Error" };
    try {
      error = await response.json();
      //Error if no body
    } catch (ex) {}

    throw new Error(error.error);
  }
}

export async function fetchUrlAuthQueryParam<T>(
  url: string,
  queryParam: string,
  token: string,
): Promise<T> {
  const response = await fetch(
    WS_URL + url + "?lang=" + document.documentElement.lang + "&" + queryParam,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        Lang: document.documentElement.lang,
      },
    },
  );

  if (response.ok && (response.status === 200 || response.status == 201)) {
    return response.json() as Promise<T>;
  } else {
    let error: IBackendError = { error: "Error" };
    try {
      error = await response.json();
      //Error if no body
    } catch (ex) {}

    throw new Error(error.error);
  }
}

export async function fetchUrlAuth<T>(url: string, token: string): Promise<T> {
  const response = await fetch(
    WS_URL + url + "?lang=" + document.documentElement.lang,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        Lang: document.documentElement.lang,
      },
    },
  );

  if (response.ok && (response.status === 200 || response.status == 201)) {
    return response.json() as Promise<T>;
  } else {
    let error: IBackendError = { error: "Error" };
    try {
      error = await response.json();
      //Error if no body
    } catch (ex) {}

    throw new Error(error.error);
  }
}

export async function deleteUrlAuth(url: string, token: string): Promise<void> {
  const response = await fetch(
    WS_URL + url + "?lang=" + document.documentElement.lang,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain, *//*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        Lang: document.documentElement.lang,
      },
    },
  );
  //return response.json() as Promise<T>
  if (!(response.ok && (response.status === 204 || response.status === 200))) {
    let error: IBackendError = { error: "Error" };
    try {
      error = await response.json();
      //Error if no body
    } catch (ex) {}

    throw new Error(error.error);
  }
}

export async function putUrlAuth(
  url: string,
  obj: any,
  token: string,
): Promise<void> {
  const response = await fetch(
    WS_URL + url + "?lang=" + document.documentElement.lang,
    {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, *//*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        Lang: document.documentElement.lang,
      },
      body: JSON.stringify(obj),
    },
  );

  if (!(response.ok && (response.status === 200 || response.status === 201))) {
    let error: IBackendError = { error: "Error" };
    try {
      error = await response.json();
      //Error if no body
    } catch (ex) {}

    throw new Error(error.error);
  }
}

export async function putUrlAuthReturn<T>(
  url: string,
  obj: any,
  token: string,
): Promise<T> {
  const response = await fetch(
    WS_URL + url + "?lang=" + document.documentElement.lang,
    {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, *//*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        Lang: document.documentElement.lang,
      },
      body: JSON.stringify(obj),
    },
  );
  if (response.ok && (response.status === 200 || response.status == 201)) {
    //await new Promise<void>((resolve) => resolve());
    return response.json() as Promise<T>;
  } else {
    let error: IBackendError = { error: "Error" };
    try {
      error = await response.json();
      //Error if no body
    } catch (ex) {}

    throw new Error(error.error);
  }
}

export async function postUrlAuth<T>(
  url: string,
  obj: any,
  token: string,
): Promise<T> {
  const response = await fetch(
    WS_URL + url + "?lang=" + document.documentElement.lang,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, *//*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        Lang: document.documentElement.lang,
      },
      body: JSON.stringify(obj),
    },
  );
  if (response.ok && (response.status === 200 || response.status == 201)) {
    return response.json() as Promise<T>;
  } else {
    let error: IBackendError = { error: "Error" };
    /*if(response.status == 401) {
            error.error = "Unauthorized"
        }*/
    try {
      error = await response.json();
      //Error if no body
    } catch (ex) {}

    throw new Error(error.error);
  }
}

export async function postFormData<T>(
  url: string,
  obj: FormData,
  token: string,
): Promise<T> {
  const response = await fetch(
    WS_URL + url + "?lang=" + document.documentElement.lang,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, *//*",
        //The browser will set the multipart/form-data for us
        //'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + token,
        Lang: document.documentElement.lang,
      },
      body: obj,
    },
  );
  if (response.ok && (response.status === 200 || response.status == 201)) {
    return response.json() as Promise<T>;
  } else {
    let error: IBackendError = { error: "Error" };
    /*if(response.status == 401) {
            error.error = "Unauthorized"
        }*/
    try {
      error = await response.json();
      //Error if no body
    } catch (ex: any) {
      error.error = ex;
    }

    throw new Error(error.error);
  }
}

export async function putFormData<T>(
  url: string,
  obj: FormData,
  token: string,
): Promise<T> {
  const response = await fetch(
    WS_URL + url + "?lang=" + document.documentElement.lang,
    {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, *//*",
        //The browser will set the multipart/form-data for us
        //'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + token,
        Lang: document.documentElement.lang,
      },
      body: obj,
    },
  );
  if (response.ok && (response.status === 200 || response.status == 201)) {
    return response.json() as Promise<T>;
  } else {
    let error: IBackendError = { error: "Error" };
    /*if(response.status == 401) {
            error.error = "Unauthorized"
        }*/
    try {
      error = await response.json();
      //Error if no body
    } catch (ex: any) {
      error.error = ex;
    }

    throw new Error(error.error);
  }
}
