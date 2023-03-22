
async function movieService(method, url, data, token) {
    let options = {};
    if (method !== "GET") {
        options.method = method;
        if (data) {
            options.headers = {
                "Content-Type": "application/json"
            };
            options.body = JSON.stringify(data);
        }
    }
    if(token){
        options.headers ={
            ...options?.headers,
            "X-Authorization": token
        }
    }
        const response = await fetch(url, options);
        let rezult = {};
        if (response.ok && response.status === 204) {
            return rezult
        }
        
        if(!response.ok){
            throw await response.json()
        }
        rezult = await response.json();
        return rezult;
    


}

const get = movieService.bind(null, "GET");
const post = movieService.bind(null, "POST");
const put = movieService.bind(null, "PUT");
const del = movieService.bind(null, "DELETE");

const services = {
    "get": get,
    "post": post,
    "put": put,
    "delete": del
};

export default services;