import { runCommand, getRandomTime } from './utils';

const pullRequest = async () => {
    let count = 20
    while (count--) {
        const data = getRandomTime()
        await runCommand(`git checkout main`)
        await runCommand(`git commit --allow-empty -m ${data}-commit"`)
        await runCommand(`git checkout -b ${data.replaceAll(':', '-')}`)
        await runCommand(`git push origin ${data.replaceAll(':', '-')}`)
        await runCommand(`gh pr create -f`)
    }
}

pullRequest()