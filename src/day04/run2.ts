// @ts-nocheck

import { readLines } from "../utils/readfile";





async function start() {

    let lines = (await readLines('./input'));
    console.log(lines);


    // let cardWinnings : number[] = Array.from({length: lines.length}, () => 0);

    let cardIndexWinnings: number[][] = Array.from({length: lines.length}, () => []);

    for(let i = lines.length-1; i >= 0; i--) {
        const line = lines[i];

        console.group(line);

        const [winningNumbers, yourCard] = line.split(": ")[1].split(" | ").map((part) => part.split(" ").filter((x) => x.trim() !== "").map((x) => parseInt(x)));
        // console.log("winningNumbers", winningNumbers);
        // console.log("yourCard", yourCard);

        let totalWins = 0;
        
        for(let i = 0; i < yourCard.length; i++) {
            let number = yourCard[i];
            if(winningNumbers.indexOf(number) !== -1) {
                // console.log("number", number);
                totalWins++;
            }
        }

        console.log("totalWins", totalWins);

        

        for(let j=0; j<totalWins; j++) {
            let idx = i + 1 + j;
            if(idx >= lines.length) {
                idx = lines.length-1;
            }

            cardIndexWinnings[i].push(idx);

        }

        console.groupEnd();
    }

    
    console.log(cardIndexWinnings);

    let cardWinnings : number[] = Array.from({length: lines.length}, () => 0);


    for(let i=lines.length-1; i>=0; i--) {
        const thisCardWins = cardIndexWinnings[i];
        
        console.group(`idx ${i}`);
        let totalWinnings = 0;

        // go and get the total of all the sub winnings
        for(const cardIdx of thisCardWins) {
            console.log(cardIdx);

            totalWinnings += cardWinnings[cardIdx];
        }

        cardWinnings[i] = totalWinnings + thisCardWins.length;
        console.log(cardWinnings);

        console.groupEnd();
    }

    console.log(cardWinnings.reduce((a, b) => a + b, 0) + lines.length);

}

start().then(console.error).catch(console.error);
