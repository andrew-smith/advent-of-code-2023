// @ts-nocheck

import { readLines } from "../utils/readfile";

const str_numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', '1', '2', '3', '4', '5', '6', '7', '8', '9'].sort((a, b) => a.length - b.length);
const str_numbers_reversed = str_numbers.map((str) => str.split('').reverse().join(''));

console.log(str_numbers);
console.log(str_numbers_reversed);

const number_string_to_number = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4, 
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8, 
    'nine': 9,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4, 
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8, 
    '9': 9,
};


function findNextNumber(line: string, arrayToCheck: string[]) {

    for(let i=0; i<line.length; i++) {

        for(let j=0; j<arrayToCheck.length; j++) {

            let str = arrayToCheck[j];
            let str_len = str.length;

            if(line.substring(i, i + str_len) === str) {
                return str;
            }
        }
    }
}


async function start() {

    let lines = (await readLines('./input'));
    console.log(lines);

    const nums = lines.map((line) => {

        const first = findNextNumber(line, str_numbers);
        console.log(first);
    
        const last = findNextNumber(line.split('').reverse().join(''), str_numbers_reversed)?.split('').reverse().join('');
        console.log(last);

        return parseInt(number_string_to_number[first] + "" + number_string_to_number[last]);
    });

    console.log(nums);



    // console.log(nums.sort((a, b) => b-a));

    console.log(nums.reduce((a, b) => a + b, 0));


}

start().then(console.error).catch(console.error);
