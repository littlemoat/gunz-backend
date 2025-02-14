
import fs from 'fs';
import path from 'path';

import { runCommand } from './utils';
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

const repo_name_regex = /github\.com\/[^\/]+\/([^\/]+)/;

const git_name = '0xbetty.eth'
const git_username = 'betty0915'
const git_email = 'daniellukas.dev@gmail.com'

const filter_command = `git filter-branch -f --env-filter "GIT_AUTHOR_NAME='${git_name}' GIT_AUTHOR_EMAIL='${git_email}' GIT_COMMITTER_NAME='${git_name}' GIT_COMMITTER_EMAIL='${git_email}'" HEAD`

const upload = async () => {
  const data = fs.readFileSync('my_repo_list.txt', 'utf8');

  const urls = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  // urls.map(async (url: string, index: number) => {
  for (let i = 0; i < urls.length; i++) {
    try {
      const url = urls[i]
      const match = url.match(repo_name_regex);
      const change_command = `gh repo edit ${url} --visibility public`
      await runCommand(change_command);
    } catch (e) {

    }
  }
}

upload()