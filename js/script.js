class Player {
    constructor(name) {
        this.name = name;
        this.totalScore = 0;
        this.currentRoll = [];
    }

    rollDice() {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        this.currentRoll = [dice1, dice2];
        return this.calculateScore();
    }

    calculateScore() {
        const [dice1, dice2] = this.currentRoll;
        if (dice1 === 1 || dice2 === 1) {
            return 0;
        } else if (dice1 === dice2) {
            return (dice1 + dice2) * 2;
        } else {
            return dice1 + dice2;
        }
    }
}

let player = new Player("Player");
let computer = new Player("Computer");
let currentRound = 1;

const updateDiceImages = (diceId1, diceId2, roll1, roll2) => {
    document.getElementById(diceId1).src = `images/dice${roll1}.jpeg`;
    document.getElementById(diceId2).src = `images/dice${roll2}.jpeg`;

    // Add fade-in animation
    document.getElementById(diceId1).classList.add('fade-in');
    document.getElementById(diceId2).classList.add('fade-in');

    setTimeout(() => {
        document.getElementById(diceId1).classList.remove('fade-in');
        document.getElementById(diceId2).classList.remove('fade-in');
    }, 500);
};

const updateDisplay = () => {
    document.getElementById('player-total').textContent = player.totalScore;
    document.getElementById('computer-total').textContent = computer.totalScore;
    document.getElementById('round-info').textContent = `Round: ${currentRound}`;
};

const checkWinner = () => {
    const winnerMessage = document.getElementById('winner-message');
    if (player.totalScore > computer.totalScore) {
        winnerMessage.textContent = 'Player wins!';
    } else if (computer.totalScore > player.totalScore) {
        winnerMessage.textContent = 'Computer wins!';
    } else {
        winnerMessage.textContent = 'It\'s a tie!';
    }
};

document.getElementById('roll-btn').addEventListener('click', () => {
    if (currentRound <= 3) {
        // Player rolls
        const playerScore = player.rollDice();
        const computerScore = computer.rollDice();

        // Update scores
        player.totalScore += playerScore;
        computer.totalScore += computerScore;

        // Update dice images
        updateDiceImages('player-dice1', 'player-dice2', player.currentRoll[0], player.currentRoll[1]);
        updateDiceImages('computer-dice1', 'computer-dice2', computer.currentRoll[0], computer.currentRoll[1]);

        // Update display
        updateDisplay();

        currentRound++;
        if (currentRound > 3) {
            checkWinner();
            document.getElementById('roll-btn').disabled = true;
        }
    }
});

document.getElementById('reset-btn').addEventListener('click', () => {
    
    player.totalScore = 0;
    computer.totalScore = 0;
    player.currentRoll = [];
    computer.currentRoll = [];
    currentRound = 1;

    
    document.getElementById('player-dice1').src = 'images/placeholder.png';
    document.getElementById('player-dice2').src = 'images/placeholder.png';
    document.getElementById('computer-dice1').src = 'images/placeholder.png';
    document.getElementById('computer-dice2').src = 'images/placeholder.png';

    
    document.getElementById('player-total').textContent = '0';
    document.getElementById('computer-total').textContent = '0';
    document.getElementById('round-info').textContent = 'Round: 1';
    document.getElementById('winner-message').textContent = '';

    document.getElementById('roll-btn').disabled = false;
});
