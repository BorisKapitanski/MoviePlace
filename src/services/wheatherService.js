const apiKey = "0a20bb8354c44515ada123447232803";


export const getWheather = async () => {
    const data = await getIp();
    const baseUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${data.city}&aqi=no`;
    const response = await fetch(baseUrl);
    if (response.ok) {
        return await response.json();
    }
    throw response;
}

const getIp = async () => {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    throw response;

}