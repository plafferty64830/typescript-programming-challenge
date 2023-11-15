interface Interval {
    id: number;
    ranges: { start: Date | null; end: Date | null }[];
}

export function findFreeIntervals(inputData: string[]): string[] {

    //process the data into intervals
    const intervals: Interval[] = inputData.map(entry => {
        const [id, rangesStr] = entry.split('@');
        const ranges = rangesStr.split(',').map(range => {
            const [start, end] = range.slice(1, -1).split('/');
            return {
                start: start ? new Date(start) : null,
                end: end ? new Date(end) : null,
            };
        });
        return {
            id: parseInt(id),
            ranges,
        };
    });


    // Step 2: Create a schedule
    const schedule: { [time: string]: number } = {};

    // Step 3: Update the schedule based on intervals
    intervals.forEach(interval => {
        interval.ranges.forEach(range => {
            const formattedStart = formatDate(range.start);
            const formattedEnd = formatDate(range.end);

            if (formattedStart) {
                schedule[formattedStart] = (schedule[formattedStart] || 0) + 1;
            }

            if (formattedEnd) {
                schedule[formattedEnd] = (schedule[formattedEnd] || 0) - 1;
            }
        });
    });

    // Step 4: Find intervals with at least 2 workers free
    const result: string[] = [];
    let workerCount = 0;
    let currentStart: string | undefined | null;

    // Step 5: Merge overlapping intervals
    Object.keys(schedule)
        .sort()
        .forEach(time => {
            const timestamp = new Date(time);

            if (workerCount >= 2 && currentStart !== undefined) {
                const currentEnd = formatDate(timestamp);
                if (currentEnd) {
                    result.push(`${currentStart}/${currentEnd}`);
                }
                currentStart = undefined;
            }

            workerCount += schedule[time];

            if (workerCount >= 2 && currentStart === undefined) {
                currentStart = formatDate(timestamp);
            }
        });

    return result;
}

/**
 * used to format the date into the an isoString and handle null entries
 */
function formatDate(date: Date | null): string | null {
    if (date instanceof Date === true && date !== null) {
        return date ? date.toISOString() : null;
    } else {
        return null
    }

}
