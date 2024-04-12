// DOM




class game_1 {
    constructor() {
        // DOM
        this.choices = document.querySelector('.choices');
        this.display_player_choice = document.querySelector('.player_choice');
        this.display_computer_choice = document.querySelector('.computer_choice');
        this.display_player_score = document.querySelector('.player_score');
        this.display_computer_score = document.querySelector('.computer_score');
        this.display_round_winner = document.querySelector('.display_round_winner');

        // variables
        this.player_choice = null;
        this.computer_choice = null;
        this.round_winner = null;
        this.player_score = 0;
        this.computer_score = 0;

        // event listener
        this.choices.onclick = (event) => this.get_choice(event);

        // initializers
        this.display_scores();

        // // create elements
        // this.player_a = document.createElement('img');
    }

    // get user choice 
    get_choice(event) {
        // use closest to traverse to the button class when the img is clicked instead of the button
        const player_choice = event.target.closest('.rock, .paper, .scissors');
        if (!player_choice) return;

        
        switch(true) {
            case player_choice.classList.contains('rock'):
                this.player_choice = String(player_choice.classList);
                break;
            case player_choice.classList.contains('paper'):
                this.player_choice = String(player_choice.classList);
                break;
            case player_choice.classList.contains('scissors'):
                this.player_choice = String(player_choice.classList);
                break;
        }

        this.check_round_winner();

        console.log(`player choice:  ${this.player_choice}`);
        console.log(`computer choice:  ${this.computer_choice}`);
        console.log(`round winner:  ${this.round_winner}`);
    }

    gen_computer_choice() {
        const choices = ['rock', 'paper', 'scissors'];
        // generate random no.
        const rand_index = Math.floor(Math.random() * 3);
        this.computer_choice = choices[rand_index];
    }

    check_round_winner() {
        // this.display_player_choice
        this.gen_computer_choice();

        if (this.player_choice == this.computer_choice) {
            this.round_winner = 'Tie'
            this.display_round_winner.textContent = `It's a ${this.round_winner}`;
        } else {
            switch(this.player_choice) {
                case 'rock':
                    if (this.computer_choice === 'paper') {
                        this.round_winner = 'Computer';
                        this.computer_score += 1;
                    } else {
                        this.round_winner = 'Player';
                        this.player_score += 1;
                    }
                    break;
                case 'paper':
                    if (this.computer_choice === 'scissors') {
                        this.round_winner = 'Computer';
                        this.computer_score += 1;
                    } else {
                        this.round_winner = 'Player';
                        this.player_score += 1;
                    }
                    break;
                case 'scissors':
                    if (this.computer_choice === 'rock') {
                        this.round_winner = 'Computer';
                        this.computer_score += 1;
                    } else {
                        this.round_winner = 'Player';
                        this.player_score += 1;
                    }
                    break; 
            }
            this.display_round_winner.textContent = `${this.round_winner} won`;
        }
        this.display_scores();
    }

    display_scores() {
        this.display_player_score.textContent = `Player: ${this.player_score}`;
        this.display_computer_score.textContent = `Computer: ${this.computer_score}`;
    }
}

const start = new game_1();