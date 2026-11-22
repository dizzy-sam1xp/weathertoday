export const getWeatherInfo = (code: number, isDay = 1) => {
    if (code === 0) {
        return isDay
            ? { condition: "Sunny", icon: "☀️" }
            : { condition: "Clear", icon: "🌙" };
    }
    if (code === 1 || code === 2) {
        return isDay
            ? { condition: "Partly Cloudy", icon: "⛅" }
            : { condition: "Partly Cloudy", icon: "☁️" };
    }
    if (code === 3) {
        return { condition: "Cloudy", icon: "☁️" };
    }
    if (code >= 45 && code <= 48) {
        return { condition: "Foggy", icon: "🌫️" };
    }
    if (code >= 51 && code <= 67) {
        return { condition: "Rainy", icon: "🌧️" };
    }
    if (code >= 71 && code <= 77) {
        return { condition: "Snowy", icon: "❄️" };
    }
    if (code >= 80 && code <= 82) {
        return { condition: "Rain Showers", icon: "🌦️" };
    }
    if (code >= 85 && code <= 86) {
        return { condition: "Snow Showers", icon: "🌨️" };
    }
    if (code >= 95) {
        return { condition: "Thunderstorm", icon: "⛈️" };
    }
    return { condition: "Unknown", icon: "🌡️" };
};