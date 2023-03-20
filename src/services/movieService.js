
async function movieService(method, url, data) {
    if (method !== "GET") {
        let options = {};
        options.method = method;
        if (data) {
            options.header = {
                "Content-Type": "application/json"
            };
            options.body = JSON.stringify(data);
        }
        try {
            const response = await fetch(url, options);
            const rezult = await response.json();
            return rezult;
        } catch (error) {
            console.log("ERROR", error);
        }
    }
    try {
        const response = await fetch(url);
        let rezult = {};
        if (response.ok && response.status === 204) {
            return rezult
        }
        rezult = await response.json();
        return rezult;
    } catch (error) {
        console.log("ERROR", error)
    }

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