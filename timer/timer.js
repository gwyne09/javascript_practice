// dom
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");

const start_button = document.getElementById("start");
const pause_button = document.getElementById("pause");
const reset_button = document.getElementById("reset");


// logic is to increase ms until it reaches 1000ms (1 sec), then reset it to 0ms while increasing sec
// this goes continuously to other units...

// Code for the timer
class Timer {
    constructor() {
        this.reset_program();
        this.is_running = false;
        this.timer_interval_id = null;
        this.update_interval = 100; // Update HTML every 100 milliseconds

        start_button.onclick = () => this.start_program();
        pause_button.onclick = () => this.pause_program();
        reset_button.onclick = () => this.reset_program();
    }

    update_html() {
        hour.textContent = this.hour_count.toString().padStart(2, '0');
        minute.textContent = this.minute_count.toString().padStart(2, '0');
        seconds.textContent = this.seconds_count.toString().padStart(2, '0');
        milliseconds.textContent = this.milliseconds_count.toString().padStart(2, '0').slice(0, 2); // slice used to remove the third figure
    }

    reset_program() {
        this.pause_program();
        this.hour_count = 0;
        this.minute_count = 0;
        this.seconds_count = 0;
        this.milliseconds_count = 0;
        this.is_running = false;
        this.update_html();
    }

    pause_program() {
        this.is_running = false;
        clearInterval(this.timer_interval_id);
    }

    start_program() {
        // make sure the program is not running, before running it
        if (!this.is_running) {
            this.is_running = true;
            console.log("now starting...");
            this.timer_interval_id = setInterval(() => this.increase_milliseconds(), this.update_interval);
        }
    }

    increase_milliseconds() {
        this.milliseconds_count += this.update_interval;
        if (this.milliseconds_count >= 1000) {
            this.increase_second();
            this.milliseconds_count = 0;
        }
        this.update_html();
    }

    increase_second() {
        this.seconds_count++;
        if (this.seconds_count >= 60) {
            this.increase_minute();
            this.seconds_count = 0;
        }
    }

    increase_minute() {
        this.minute_count++;
        if (this.minute_count >= 60) {
            this.increase_hour();
            this.minute_count = 0;
        }
    }

    increase_hour() {
        this.hour_count++;
    }
}

let timer = new Timer();

