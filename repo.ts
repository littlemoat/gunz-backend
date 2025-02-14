import cron from 'node-cron';

import { runCommand } from './utils';

// Generates a random string of a given length
const generateRandomString = (length: number = 8): string => {
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result: string = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Define chech current repo exists
const doesRepoExist = async (name: string) => {
  const command = `gh repo view ${name}`;
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

// Define create private repo function
const newTenPrivateRepo = async () => {
  let i = 0
  while (i++ < 10) {
    const name = generateRandomString()
    if (await doesRepoExist(name)) i--
    await runCommand(`gh repo create ${name} --private`)
  }
}

// Schedule the function to run at a specific time (every hour)
cron.schedule('0 0 * * *', () => {
  newTenPrivateRepo();
});