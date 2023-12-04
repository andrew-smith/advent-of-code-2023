// @ts-nocheck

import { readLines } from "../utils/readfile";


async function start() {

    let lines = (await readLines('./input'));
    console.log(lines);


    let nums = lines.map((line) => {
        let foundNum = "";

        for(let i = 0; i < line.length; i++) {
            let char = line.charAt(i);
            console.log(char);
            
            try {
                let num = parseInt(char);
                console.log(num);

                if(!Number.isNaN(num)) {

                    i = line.length;
                    foundNum = num;
                }
            }
            catch (e) {
                // console.log(e);
            }
        }

        // do it in reverse
        for(let i = line.length - 1; i >= 0; i--) {
            let char = line.charAt(i);
            
            try {
                let num = parseInt(char);
                console.log(num);


                if(!Number.isNaN(num)) {

                    i = -1;
                    foundNum += "" + num;
                }
            }
            catch (e) {
                // console.log(e);
            }
        }

        console.log(foundNum);
        return parseInt(foundNum);
    });

    console.log(nums.sort((a, b) => b-a));

    console.log(nums.reduce((a, b) => a + b, 0));


}

start().then(console.error).catch(console.error);
