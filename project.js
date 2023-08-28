// Importing the module
const prompt = require("prompt-sync")();

//Size of the Slot Machine
const ROWS = 3;
const COLS = 3;

//Define the Symbols
const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

//Define the Values
// Lets say you get a row of A so betAmount * 5
const SYMBOLS_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}   

const getdeposit = () => {
    while (true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, please try again.")
        }
        else {
            return numberDepositAmount;
        }
    };
};


const getNumberOfLines = () => {
    while (true){
        const lines = prompt("Enter the number of lines to bet(1-3): ");
        const numberOfLines = parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines > 3 || numberOfLines < 1){
            console.log("Invalid numbe of lines, please try again.")
        }
        else {
            return numberOfLines;
        }
    };
};

const getBet = (balance, lines) => {
    while (true){
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet * lines > balance ){
            console.log("Invalid bet, please try again.")
        }
        else {
            return numberBet;
        }
    };
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = []
    for (let i = 0; i < ROWS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < COLS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            reels[i].push(reelSymbols[randomIndex]);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels
};

const getTranspose = (reels) => {
    const transposeReels = [[], [], []]
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j ++) {
            transposeReels[j].push(reels[i][j]);
        }
    }
    return transposeReels;
};

const printSlots = (reels) => {
    console.log(" ============");
    let mi = 0;
    for (let i = 0; i < ROWS; i++) {
        let reelSymbolsRow = "";
        for (let j = 0; j < COLS; j ++) {
            reelSymbolsRow += " | "
            reelSymbolsRow += reels[i][j];
        }
        reelSymbolsRow += " | "
        console.log(reelSymbolsRow)
        if (mi < 2) {
            mi++;
            console.log(" ------------");
        }
    }
    console.log(" ============");
};

const getWinnings = (rows, bet, lines) => {
    let winning = 0;
    for (let row = 0; row < lines; row ++) {
        const rowSlot = rows[row];
        let flag = true;

        for (let j = 0; j < COLS; j++) {
            if (rowSlot[0] != rowSlot[j]) {
                flag = false;
            }
        }
        
        if (flag) {
            winning += bet * SYMBOLS_VALUES[rowSlot[0]];
        }
    }
    return winning;
};

const game = () => {
    let balance = getdeposit();
    let exitFlag = true;

    while (exitFlag) {
        if (balance > 0) {
            const numberOfLines = getNumberOfLines();
            const betAmount = getBet(balance, numberOfLines);
            let reels = spin();
            reels = getTranspose(reels);
            printSlots(reels);
            const won = getWinnings(reels, betAmount, numberOfLines);
            if (won != 0) {
                console.log("Hoorah, you won: ", won);
                balance += won;
            }
            else {
                console.log("Sorry, you lost", betAmount * numberOfLines ,"$ in the bet, better Luck next time");
                balance = balance - betAmount * numberOfLines;
            }
            console.log("Current Balance in the Account is: $", balance);
            console.log("");
            const continuePlaying = prompt("Press 911 to exit the game: ");
            if (parseFloat(continuePlaying) == 911) {
                console.log("");
                console.log("Thank you for playing.");
                exitFlag = false;
                break;
            }
            const doYouWantToContinue = prompt("Enter 100 to enter money: ");
            if (doYouWantToContinue == 100) {
                const addAmount = prompt("How much amount do you want to add: ")
                balance += parseFloat(addAmount);
                console.log("Current Balance in the Account is: $", balance);
            }
        }
    }
};


game();



