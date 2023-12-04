
import fs from 'fs';
import util from 'util';


const _readFile = util.promisify(fs.readFile);


/**
 * Read an entire file into a string
 */
export async function readFile(filename: string) {

    return (await _readFile(filename)).toString();
}

/**
 * Read an entire file and split into individual lines
 */
export async function readLines(filename: string) {

    return (await (readFile(filename))).split("\n");
}
