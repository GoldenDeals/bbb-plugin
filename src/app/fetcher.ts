export function request<TResponse>(
    url: string,
    id: string,
    token: string,
    config: RequestInit = { method: "GET" }
): Promise<TResponse> {
    if (id == "" || token == "") {
        return null
    }
    return fetch('https://api.test.fiveplas.ru/' + url + '?' + 'id=' + id + "&token=" + token, config)
        .then((response) => {
            if (response.status == 404) {
                window.location.href = "https://www.test.fiveplas.ru/account"
            }
            return response.json()
        })
        .then((data) => data as TResponse)
}


