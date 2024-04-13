class Game1 {
    constructor() {
        // DOM elements
        this.choices = document.querySelector('.choices');
        this.display_player_choice = document.querySelector('.player_choice');
        this.display_computer_choice = document.querySelector('.computer_choice');
        this.display_player_score = document.querySelector('.player_score');
        this.display_computer_score = document.querySelector('.computer_score');
        this.display_round_winner = document.querySelector('.display_round_winner');

        // Variables
        this.player_choice = document.createElement('img');
        this.computer_choice = document.createElement('img');
        this.player_score = 0;
        this.computer_score = 0;
        this.round_winner = null;

        // Event listener
        this.choices.onclick = (event) => this.get_choice(event);

        // Initialize scores display
        this.display_scores();
    }

    // Method to get user's choice
    get_choice(event) {
        const choice_button = event.target.closest('.rock, .paper, .scissors');
        if (!choice_button) return;

        this.player_choice.id = choice_button.classList.value;
        this.play_round();
    }

    // Generate computer choice
    generate_computer_choice() {
        const choices = ['rock', 'paper', 'scissors'];
        const rand_index = Math.floor(Math.random() * choices.length);
        this.computer_choice.id = choices[rand_index];
    }

    // Play a round and update the state
    play_round() {
        this.generate_computer_choice();
        this.display_choices();
        this.determine_round_winner();
        this.update_background_color();
        this.display_scores();
    }

    // Display choices player and computer made
    display_choices() {
        // Clear existing images
        this.display_player_choice.innerHTML = '';
        this.display_computer_choice.innerHTML = '';

        // Set image source and size
        const base_path = '/apps/games/game_1/resources/';
        this.player_choice.src = `${base_path}${this.player_choice.id}_player.png`;
        this.computer_choice.src = `${base_path}${this.computer_choice.id}_opponent.png`;

        this.player_choice.style.width = '17vw';
        this.computer_choice.style.width = '17vw';

        // Append new images to DOM
        this.display_player_choice.appendChild(this.player_choice);
        this.display_computer_choice.appendChild(this.computer_choice);
    }

    // Determine the winner of the round
    determine_round_winner() {
        if (this.player_choice.id === this.computer_choice.id) {
            this.round_winner = 'Tie';
            this.display_round_winner.textContent = `It's a ${this.round_winner}`;
        } else {
            // 'choice': 'what this choice beats'
            const outcome = {
                'rock': 'scissors',
                'paper': 'rock',
                'scissors': 'paper',
            };
            // basically, we are checking if the choice of the computer 
            // beats the choice of the player
            if (this.player_choice.id === outcome[this.computer_choice.id]) {
                this.round_winner = 'Computer';
                this.computer_score += 1;
            } else {
                this.round_winner = 'Player';
                this.player_score += 1;
            }
            this.display_round_winner.textContent = `${this.round_winner} won!`;
        }
    }

    // Update background color based on the round winner
    update_background_color() {
        const bg_color_mapping = {
            'Player': 'rgba(14, 139, 41, 0.3)',
            'Computer': 'rgba(167, 0, 0, 0.3)',
            'Tie': 'rgba(40, 49, 173, 0.3)',
        };

        this.display_round_winner.style.backgroundColor = bg_color_mapping[this.round_winner];
    }

    // Display player and computer scores
    display_scores() {
        this.display_player_score.textContent = `Player: ${this.player_score}`;
        this.display_computer_score.textContent = `Computer: ${this.computer_score}`;
    }
}

// Instantiate the game
const start = new Game1();
