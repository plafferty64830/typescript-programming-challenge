import { readFileSync, appendFile } from "fs";
import { processDateList } from "./functions/processDateStr";
import { findFreeIntervals } from "./functions/getIntervals";

/**
 * 
 * @param inputFilePath 
 * @returns ISO Date
 * 
 * Process dates in epoch format in an array that can be sort in ascending order
 * return the date in position 1 which is the earliest date a worker is free.
 */
export async function solveFirstQuestion(
  inputFilePath: string
): Promise<string> {

  //empty array to store processed data
  const data: any = []

  //first read the contents of the input file
  const fileContents = readFileSync(inputFilePath, 'utf-8');

  //process each line at a time
  fileContents.split(/\r?\n/).forEach((line) => {
    const resultantDates = processDateList(line)
    data.push(...resultantDates)
  });

  //sort the processed data into ascending order so we can return the earliest available
  const sorted = data.sort()

  //format date in iso format for returning
  const utcDate = new Date(sorted[0]).toISOString();

  return utcDate;
}

/**
 * 
 * @param inputFilePath 
 * @returns ISO Date
 * 
 * Same solution explanation as question 1 except returning the date at the end of the sorted list.
 * This shows latest interval where the worker is available.
 */
export async function solveSecondQuestion(
  inputFilePath: string
): Promise<string> {

  //empty array to store processed data
  const data: any = []

  //first read the contents of the input file
  const fileContents = readFileSync(inputFilePath, 'utf-8');

  //process each line at a time
  fileContents.split(/\r?\n/).forEach((line) => {
    const resultantDates = processDateList(line)
    data.push(...resultantDates)
  });

  //sort the processed data into ascending order so we can return the latest available
  const sorted = data.sort()

  //get the latest date in iso date format - using the length (-1 as arrays start at 0) to get the last item in the sorted array
  const utcDate = new Date(sorted[sorted.length - 1]).toISOString();

  return utcDate;
}

export async function solveThirdQuestion(
  inputFilePath: string
): Promise<string[]> {
  //  //empty array to store processed data
  //  const data:any = []

  //  //first read the contents of the input file
  //  const fileContents = readFileSync(inputFilePath, 'utf-8');

  //  //process each line at a time
  //  fileContents.split(/\r?\n/).forEach((line, index) => {
  //   const resultantDates = processDateList(line)
  //   data.push({[index]: resultantDates})
  //  });

  //  appendFile('outputTex.txt', JSON.stringify(data) + '\n\n', function(err){
  //   console.log(err)
  //  } )

  const inputData = readFileSync(inputFilePath, 'utf8').split('\n').filter(Boolean);

  // Find and print the result
  const result = findFreeIntervals(inputData);

  return result
}
