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


        console.log("#############");
        let colours = {
            blue: 0,
            green: 0,
            red: 0,
        };

        for (let i = 0; i < games.length; i++) {

            const g = games[i];

            for (let colour in g) {
                if (!colours[colour]) {
                    colours[colour] = g[colour];
                }

                colours[colour] = Math.max(colours[colour], g[colour]);
            }
        };

        console.log(colours);

        return colours.blue * colours.green * colours.red;

    });


    console.log(nums);

    console.log(nums.reduce((a, b) => a + b, 0));


}

start().then(console.error).catch(console.error);
