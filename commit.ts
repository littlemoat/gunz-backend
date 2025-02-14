import * as moment from 'moment-timezone';

import { getRandomTime, runCommand } from './utils';



const commitCount = (num: number) => {
  return Math.floor(Math.random() * num);
}

const commit = async (start: string, end: string, control: number, weekend: number = 0,) => {
  const startDate = moment.tz(start, 'America/Los_Angeles');
  const endDate = moment.tz(end, 'America/Los_Angeles');
  let totalCommits = 0
  let totalDays = 0
  let currentDate: moment.Moment = startDate.clone();

  while (currentDate.isSameOrBefore(endDate)) {
    const dayOfWeek = currentDate.format('dddd');
    const probablity = Math.pow(Math.random(), 2) + control;
    let standard = 0
    switch (dayOfWeek) {
      case 'Friday':
        standard = 0.3
        break;
      case 'Saturday':
        standard = 0.6
        break;
      case 'Sunday':
        standard = 0.7
        break;
      default:
        standard = 0
        break;
    }
    if (probablity > standard) {
      const cnt = commitCount(probablity * 10);
      const formattedDate = currentDate.format('YYYY-MM-DD');
      if (cnt) totalDays++
      for (let i = 0; i < cnt; i++) {
        // console.log(formattedDate, dayOfWeek)
        console.log(`${formattedDate} ${getRandomTime()}`)
        totalCommits++
        await runCommand(`git commit --allow-empty --date="${formattedDate} ${getRandomTime()}" -m ${formattedDate}-commit"`)
      }
    }
    currentDate.add(1, 'days');
  }
  console.log("totalDays", totalDays, "totalCommits", totalCommits)
  // await runCommand(`git push origin main`)

}

commit('2023-08-01', '2023-09-30', 0.1)

// runCommand('git remote show origin')