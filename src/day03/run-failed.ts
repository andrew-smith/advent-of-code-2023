// @ts-nocheck

import { readLines } from "../utils/readfile";


async function start() {

    let lines = (await readLines('./input'));
    console.log(lines);

    const grid : string[][] = [];

    // build the grid
    lines.map((line) => {
        console.log("> " + line);

        grid.push(line.split(""));
    });
    console.log(grid);


    const shadowGrid = grid.map((row) => row.map((col) => false));
    console.log(shadowGrid);

    // parse the grid to see if there is a symbol near it
    for(let i=0; i<grid.length; i++) {
        for(let j=0; j<grid[i].length; j++) {

            const thisChar = grid[i][j];
            const isNumber = !isNaN(parseInt(thisChar));
            const isPeriod = thisChar === ".";

            if(!isNumber && !isPeriod) {
                shadowGrid[i][j] = true;
                // set all the neighbours to true
                for(let k=-1; k<=1; k++) {
                    for(let l=-1; l<=1; l++) {
                        if(i+k >= 0 && j+l >= 0 && i+k < grid.length && j+l < grid[i].length) {
                            shadowGrid[i+k][j+l] = true;
                        }
                    }
                }
            }

        }
    }




    console.log(shadowGrid);

    const foundNumbers = [];

    for(let i=0; i<grid.length; i++) {
        let isCurrentlyParsingNumber = false;
        let numberStr = "";
        let isPart = false;
        for(let j=0; j<grid[i].length; j++) {

            const thisChar = grid[i][j];
            const isNumber = !isNaN(parseInt(thisChar));

            if(isNumber) {
                isCurrentlyParsingNumber = true;
            }
            else {
                // if we were just parsing a number, then we need to check if it is valid
                if(isCurrentlyParsingNumber && isPart) {
                    foundNumbers.push(parseInt(numberStr));
                }

                isCurrentlyParsingNumber = false;
                numberStr = "";
                isPart = false;
            }

            if(isCurrentlyParsingNumber ) {
                numberStr += "" + thisChar;
                if(shadowGrid[i][j]) {
                    isPart = true;
                }
            }
            
        }
    }


    console.log(foundNumbers);

    console.log(foundNumbers.reduce((a,b) => a+b, 0));


    // print the grid
    // for(let i=0; i<grid.length; i++) {
    //     let line = "";
    //     for(let j=0; j<grid[i].length; j++) {

    //         if(shadowGrid[i][j]) {
    //             line += "X";
    //         }
    //         else {
    //             line += "."
    //         }

    //     }
    //     console.log(line);
    // }




}

start().then(console.error).catch(console.error);
