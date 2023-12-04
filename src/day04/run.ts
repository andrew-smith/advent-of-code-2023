// @ts-nocheck

import { readLines } from "../utils/readfile";


async function start() {

    let lines = (await readLines('./input'));
    console.log(lines);



    let things = lines.map((line) => {
        console.log("> " + line);

        const [winningNumbers, yourCard] = line.split(": ")[1].split(" | ").map((part) => part.split(" ").filter((x) => x.trim() !== "").map((x) => parseInt(x)));
        console.log("winningNumbers", winningNumbers);
        console.log("yourCard", yourCard);


        let totalScore = 0;
        
        for(let i = 0; i < yourCard.length; i++) {
            let number = yourCard[i];
            if(winningNumbers.indexOf(number) !== -1) {
                console.log("number", number);

                if(totalScore  > 0) {
                    totalScore *= 2;
                }
                else {
                    totalScore = 1;
                }
            }
        }

        return totalScore;
    });

    console.log(things);
    console.log(things.reduce((a, b) => a + b, 0));

}

start().then(console.error).catch(console.error);
