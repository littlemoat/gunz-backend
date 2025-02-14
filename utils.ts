import { exec } from 'child_process';

export const runCommand = (command: string) => {
  console.log(command)
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command '${command}': ${error}`);
        reject(error);
      } else {
        console.log(stdout);
        // console.error(stderr);
        resolve(stdout);
      }
    });
  });
}

export const getRandomTime = (): string => {
  const hour = Math.floor(Math.random() * 24); // Random hour between 0 and 23
  const minute = Math.floor(Math.random() * 60); // Random minute between 0 and 59
  const second = Math.floor(Math.random() * 60); // Random second between 0 and 59

  // Format the time
  const formattedHour = hour.toString().padStart(2, '0');
  const formattedMinute = minute.toString().padStart(2, '0');
  const formattedSecond = second.toString().padStart(2, '0');

  return `${formattedHour}:${formattedMinute}:${formattedSecond}`;
}

export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms * 1000));
};
