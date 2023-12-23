import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });
import chalk from "chalk";
import readlineSync from "readline-sync";
const playGame = () => {
    // generate secret number
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const generateSecretNumber = () => {
        let randomNumber = "";
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            randomNumber += numbers[randomIndex];
            numbers.splice(randomIndex, 1);
        }
        return randomNumber;
    };
    let secretNumber = generateSecretNumber();
    let attempts = 0;
    console.log(secretNumber);
    // validate input
    const validateInput = (input) => {
        if (input.length !== 4) {
            return chalk.bgWhiteBright(chalk.italic.redBright("\nInvalid input") +
                "⛔ " +
                chalk.cyanBright("Your guess must be 4-digit number!\n"));
        }
        const digits = [];
        for (let i = 0; i < input.length; i++) {
            const digit = input[i];
            if (digits.includes(digit)) {
                return chalk.bgWhiteBright(chalk.italic.redBright("\nAttention") +
                    "🚩 " +
                    chalk.cyanBright("Your guess should not contain repeated digits!\n"));
            }
            digits.push(digit);
            if (isNaN(Number(digit))) {
                return chalk.bgWhiteBright(chalk.italic.redBright("\nImportant note") +
                    "🪧  " +
                    chalk.cyanBright("Your guess must consist of digits only!\n"));
            }
        }
        return true;
    };
    // display hint
    const displayHint = (secretNumber, guessedNumber) => {
        let bulls = 0;
        let cows = 0;
        for (let i = 0; i < secretNumber.length; i++) {
            const secretDigit = secretNumber[i];
            const guessedDigit = guessedNumber[i];
            if (secretDigit === guessedDigit) {
                bulls++;
            }
            else if (secretNumber.includes(guessedDigit)) {
                cows++;
            }
        }
        let bullsText = bulls === 0 ? "bull" : "bulls";
        let cowsText = cows === 0 ? "cows" : "cows";
        return (chalk.yellowBright(" Hint:") +
            chalk.whiteBright(` 🐂 ${bulls} ${bullsText} and 🐄 ${cows} ${cowsText}
🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹\n`));
    };
    // main game
    console.clear();
    console.log(chalk.green.bold("🔸🔹🐂 Welcome to Bulls and Cows 🐄🔹🔸\n"));
    console.log(chalk.bgWhiteBright.redBright(" Can you guess the secret 4-digit number?\n"));
    console.log(chalk.yellowBright(" 🎮 How to Play:"));
    console.log(chalk.whiteBright(`
 1. Guess a 4-digit secret number
 2. Ensure no repeated digits in your guess
 3. You'll get hints
    🐂bulls: correct digits in the right position
    🐄cows: correct digits in the wrong position
 4. Win by guessing all 4 digits correctly\n
🔸🔹🔸🔸🔹🔸🔸🔹🔸🔸🔹🔸🔸🔹🔸🔸🔹🔸🔸🔹🔸🔹🔸🔹🔸
    ` + chalk.cyanBright(" \n🚀 Ready to play?\n")));
    let isGuessCorrect = false;
    while (!isGuessCorrect) {
        const guessedNumber = prompt(chalk.whiteBright("   Enter your 4-digit guess: "));
        const validationResult = validateInput(guessedNumber);
        if (validationResult !== true) {
            console.log(validationResult);
            continue;
        }
        attempts++;
        console.log("\n🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹");
        console.log(chalk.yellowBright(` Your guess: ${chalk.whiteBright(guessedNumber)}`));
        console.log(chalk.yellowBright(` Attempts: ${chalk.whiteBright(attempts)}`));
        const hint = displayHint(secretNumber, guessedNumber);
        console.log(hint);
        if (guessedNumber === secretNumber) {
            isGuessCorrect = true;
            console.log(chalk.redBright("✨🎊Congratulations🎊✨") +
                chalk.whiteBright(`\nYou guessed the secret number in ${attempts} attempts💪✨\n`));
        }
        else {
            console.log(chalk.cyanBright("🎯 Keep going! You're doing great!\n"));
        }
    }
    const playAgain = readlineSync.keyInYN(chalk.bgWhiteBright.redBright("\nDo you want to play again?"));
    if (playAgain) {
        playGame();
    }
    else {
        console.log(chalk.whiteBright("\nWell done! See you next time👋\n"));
    }
};
playGame();
