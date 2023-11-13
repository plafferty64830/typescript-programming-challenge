export const processDateList = (inputDtList: string) => {

    let data: any = []

    //substring by the opening array bracket ([)
    const dates: string = inputDtList.substring(inputDtList.indexOf('[') + 1, inputDtList.indexOf(']'))

    //now split by \ and append content to the data array
    const dateList = dates.split('/');

    //add each of the dates in epoch format to the data array
    dateList.forEach(inputDt => {
        //if the input date includes a comma, multiple dates have been supplied, pass this value to another function
        if(inputDt.includes(',')){
            const dates = processCsvDates(inputDt)
            data.push(...dates)
        } else {
            data.push(new Date(inputDt).getTime());
        }
       
    });

    return data;

}

export const processCsvDates = (csvList:string) => {
    let data:any = []

    const splitDates = csvList.split(',')

    splitDates.forEach(dt => {
        data.push(new Date(dt).getTime());
    });

    return data;
}