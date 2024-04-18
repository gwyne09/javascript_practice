class weather {
    constructor(url, key) {
        // DOM
        this.city_input = document.querySelector('.city_input');
        this.search = document.querySelector('.search_button');
        this.city_display = document.querySelector('.city_display');
        this.temperature_display = document.querySelector('.temperature_display');
        this.short_forecast_ico = document.querySelector('.short_forecast_ico');
        this.short_forecast_display = document.querySelector('.short_forecast_display');
        this.humidity_display = document.querySelector('.humidity_display');
        this.wind_display = document.querySelector('.wind_display');
        this.display_error = document.querySelector('.display_error');

        this.api_url = url;
        this.api_key = key;

        // settings
        this.unit = 'metric'; // imperial or standard
        this.unit_icon = {'standard':'K' ,'metric':'°C', 'imperial':'F'};

        console.log('starting...');
        this.search.onclick = () => this.fetch_weather(this.city_input.value.trim());
        this.city_input.onkeypress = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.fetch_weather(this.city_input.value.trim());
            }
        };
        this.get_location(); //fetch user's location
    }

    async fetch_weather(city) {
        if (!city) {
            this.show_error('Please enter a city.');
            return;
        }
        try {
            this.clear_error();
            const fetch_url = `${this.api_url}?q=${city}&appid=${this.api_key}&units=${this.unit}`;
            const response = await fetch(fetch_url);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Please enter a valid city name.');
                }
                throw new Error('Failed to fetch weather data. Please try again later.');
            }
            const weather = await response.json();
            // console.log(weather);
            this.display_weather(weather);
        } catch (error) {
            console.log(`${error}`);
            this.show_error(error);
        }
    }

    display_weather(weather) {
        this.city_display.textContent = weather.name + ', ' + weather.sys.country;
        this.temperature_display.textContent = weather.main.temp + this.unit_icon[this.unit];
        this.short_forecast_ico.src = this.get_weather_icon(weather.weather[0].description);
        this.short_forecast_display.textContent = weather.weather[0].description;
        this.wind_display.textContent = weather.wind.speed;
        this.humidity_display.textContent = weather.main.humidity;
    }

    show_error(err) {
        this.display_error.textContent = '*' + err;
    }

    clear_error() {
        this.display_error.textContent = '';
    }

    async get_location() {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        this.fetch_weather(data.city);
    }

    get_weather_icon(forecast_description) {
        const ico_loc = '/apps/weather/resources/';
        const img_type = '.png';
        switch(forecast_description) {
            case 'clear sky':
                return ico_loc + 'clear' + img_type;
            case 'few clouds':
            case 'scattered clouds':
            case 'broken clouds':
            case 'overcast clouds':
                // For 'few clouds', 'scattered clouds', and 'broken clouds', return 'clouds' image
                return ico_loc + 'clouds' + img_type;
            case 'rain':
            case 'thunderstorm':
                // For 'rain' and 'thunderstorm', return 'rain' image
                return ico_loc + 'rain' + img_type;
            case 'shower rain':
                return ico_loc + 'drizzle' + img_type;
            case 'snow':
                return ico_loc + 'snow' + img_type;
            case 'mist':
                return ico_loc + 'mist' + img_type;
        }
    }
}

const start_app = new weather('https://api.openweathermap.org/data/2.5/weather', '468d120aeb37f0cbce2688929bf8993a');