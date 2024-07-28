export function request<TResponse>(
    url: string,
    id: string,
    token: string,
    config: RequestInit = { method: "GET" }
): Promise<TResponse> {
    if (id == "" || token == "") {
        return
    }
    // Inside, we call the `fetch` function with 
    // a URL and config given:
    return fetch('https://api.fiveplas.ru/' + url + '?' + 'id=' + id + "&token=" + token, config)
        // When got a response call a `json` method on it
        .then((response) => response.json())
        // and return the result data.
        .then((data) => data as TResponse)
}


