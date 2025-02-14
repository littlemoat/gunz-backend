import * as fs from 'fs';

import { repoPath } from './config';
import { runCommand } from './utils';

let first_line_data: string | undefined;

// Define chech current repo exists
const dirExist = async (name: string) => {
  const command = `dir ${name}`;
  try {
    await runCommand(command);
    // If the command succeeds, it means the repository exists
    return true;
  } catch (error) {
    // console.log(error)
    // If the command fails, it means the repository doesn't exist
    return false;
  }
}

const newRepo = async () => {

  const lines_data = fs.readFileSync(repoPath, 'utf-8').split('\n');

  // const changeInfo = 
  console.log(lines_data);
  while (lines_data.length) {
    first_line_data = lines_data.shift();

    const repo_name = first_line_data?.split('/')[4]
    if (!repo_name) continue

    if (await dirExist(repo_name)) continue
    await runCommand(`git clone ${first_line_data}`)
    await runCommand(`cd ${repo_name}`)
    await runCommand(`dir`)

    // fs.writeFileSync(repoPath, lines_data.join('\n'), 'utf-8')
  }
}

newRepo()