
import fs from 'fs';
import path from 'path';

import { runCommand, wait } from './utils';
import moment from 'moment';

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

const git_name = 'solbot'
const git_username = 'poseisol'
const git_email = 'poseisol@outlook.com'

const filter_command = `git filter-branch -f --env-filter "GIT_AUTHOR_NAME='${git_name}' GIT_AUTHOR_EMAIL='${git_email}' GIT_COMMITTER_NAME='${git_name}' GIT_COMMITTER_EMAIL='${git_email}'" HEAD`

const upload = async () => {
  const data = fs.readFileSync('exist_list.txt', 'utf8');

  const urls = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  // urls.map(async (url: string, index: number) => {
  for (let i = 0; i < urls.length; i++) {
    try {
      const url = urls[i]

      const open_command = `cd ${url}`

      const new_repo_name = url
        .replace(/[_\s.]+/g, '-')
        // .toLowerCase()
        // .replace(/^-/, '')
        // .replace(/-{2,}/g, '-');

      // const repo_create_command = `gh repo create ${new_repo_name} --public`
      // const origin_url = `https://github.com/${git_username}/${new_repo_name}.git`
      // const remote_set_url = `git remote set-url origin ${origin_url}`

      // const filter = `${open_command} && ${filter_command}`
      // await runCommand(filter)
      // await runCommand(repo_create_command)

      // const set_url = `${open_command} && ${remote_set_url}`
      // await runCommand(set_url)

      const branch_command = `${open_command} && git branch`
      const branch = await runCommand(branch_command)

      const push_command = `git push -u origin ${branch}`
      const push = `${open_command} && ${push_command}`
      await runCommand(push)

      await wait(60)
    } catch (e) {
      console.error('error\n', e)
    }
  }
}

upload()