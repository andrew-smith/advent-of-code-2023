// @ts-nocheck

import { readLines } from "../utils/readfile";


function safeParseInt(strValue: string) {
    return parseInt(strValue);
}

function parseMaps(lines: string[], idx: number) : number[][] {
    let line = lines[idx];
    let map = [];

    while(line !== undefined && line.length > 0) {

        map.push(line.split(" ").map(safeParseInt));
        idx++;
        line = lines[idx];
    }


    return map;
}

type NumberMap = [number, number, number];

async function start() {

    let lines = (await readLines('./input'));
    console.log(lines);

    // first line is just the seeds
    const seeds = lines[0].split(": ")[1].split(" ").map((s) => parseInt(s));
    console.log(`Seeds ${seeds}`);


    let seedToSoilMap : NumberMap[] = [];
    let soilToFertilizerMap : NumberMap[]= [];
    let fertilizerToWaterMap : NumberMap[]= [];
    let waterToLightMap : NumberMap[]= [];
    let lightToTemperatureMap : NumberMap[]= [];
    let temperatureToHumidityMap : NumberMap[]= [];
    let humidityToLocationMap: NumberMap[]= [];

    for(let i=2; i<lines.length; i++) {
        let line = lines[i];

        if(line.startsWith("seed-to-soil map")) {
            seedToSoilMap = parseMaps(lines, i+1);
        }
        if(line.startsWith("soil-to-fertilizer map")) {
            soilToFertilizerMap = parseMaps(lines, i+1);
        }
        if(line.startsWith("fertilizer-to-water map")) {
            fertilizerToWaterMap = parseMaps(lines, i+1);
        }
        if(line.startsWith("water-to-light map")) {
            waterToLightMap = parseMaps(lines, i+1);
        }
        if(line.startsWith("light-to-temperature map")) {
            lightToTemperatureMap = parseMaps(lines, i+1);
        }
        if(line.startsWith("temperature-to-humidity map")) {
            temperatureToHumidityMap = parseMaps(lines, i+1);
        }
        if(line.startsWith("humidity-to-location map")) {
            humidityToLocationMap = parseMaps(lines, i+1);
        }
    }

    let arrays = [seedToSoilMap, soilToFertilizerMap, fertilizerToWaterMap, waterToLightMap, lightToTemperatureMap, temperatureToHumidityMap, humidityToLocationMap];

    console.log(`seedToSoilMap`, seedToSoilMap);
    console.log(`fertilizerToWaterMap`, fertilizerToWaterMap);
    console.log(`waterToLightMap`, waterToLightMap);
    console.log(`lightToTemperatureMap`, lightToTemperatureMap);
    console.log(`temperatureToHumidityMap`, temperatureToHumidityMap);
    console.log(`humidityToLocationMap`, humidityToLocationMap);

    const finalLocations : number[] = [];
    
    for(const seed of seeds) {

        let currentValue = seed;

        for(const array of arrays) {

            let found = false;

            for(const [destinationStart, sourceStart, range] of array) {
                if(currentValue >= sourceStart && currentValue < sourceStart + range) {

                    currentValue = destinationStart + (currentValue - sourceStart);
                    found = true;
                    break;
                }
            }

            if(!found) {
                currentValue = currentValue; // no change
            }
        }

        console.log(currentValue);
        finalLocations.push(currentValue);
    }

    console.log(`Final locations ${finalLocations}`);
    finalLocations.sort((a,b) => a-b);
    console.log(`Final ${finalLocations[0]}`);

}

start().then(console.error).catch(console.error);
