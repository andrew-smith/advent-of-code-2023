// @ts-nocheck

import { readLines } from "../utils/readfile";


async function start() {

    let lines = (await readLines('./input'));
    console.log(lines);



    let nums = lines.map((line) => {
        console.log("> " + line);

        const gameId = line.split(": ")[0].trim().split(" ")[1];
        console.log("GAME ID " + gameId);

        // build the game object
        const inBagArr = line.split(": ")[1];
        // console.log(inBagArr);

        const pulls = inBagArr.split(";").map(pull => pull.trim());
        console.log(pulls);

        let id = 0;

        const games = pulls.map((pull) => {
            let colours = pull.split(", ");
            console.log(colours);

            let res = {};

            colours.forEach((colour) => {
                let [count, name] = colour.split(" ");
                res[name] = parseInt(count);
            });

            console.log(res);
            return res;
        });

        let badGame = false;

        for(let i=0; i<games.length; i++) {

            if(!badGame) {

                const g = games[i];

                badGame = g.red > 12 || g.green > 13 || g.blue > 14;
    
            }

        };

        // console.log("Sum ids: " + sumIds);

        if(!badGame) {
            console.log("Bad game: " + gameId);
            return parseInt(gameId);
        }
        return 0;
    });


    console.log(nums);

    console.log(nums.reduce((a, b) => a + b, 0));


}

start().then(console.error).catch(console.error);
