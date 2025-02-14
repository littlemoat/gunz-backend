import * as fs from 'fs';

const repoPath: string = 'repo_list.txt';

let firstLineData: string | undefined;

const linesData = fs.readFileSync(repoPath, 'utf-8').split('\n');

console.log(linesData)