import subprocess
import os
from dotenv import load_dotenv
from time import sleep

load_dotenv()

name = os.environ.get("name")
email = os.environ.get("email")
repo = os.environ.get("repo")

# subprocess.run(['git', 'init'])
subprocess.run(['git', 'config', '--local', 'user.name', name])
subprocess.run(['git', 'config', '--local', 'user.email', email])

try:
    subprocess.check_output(['gh', 'repo', 'view', f'{name}/{repo}'])
    subprocess.run(['git', 'remote', 'set-url', 'origin', f'https://github.com/CleverHolmes/{repo}.git'])
except subprocess.CalledProcessError:
    subprocess.run(['git', 'remote', 'add', 'origin', f'https://github.com/CleverHolmes/{repo}.git'])
    subprocess.run(['gh', 'repo', 'create', repo, '--public'])
    subprocess.run(['git', 'checkout', '-B', 'master'])
    subprocess.run(['git', 'add', '.'])
    subprocess.run(['git', 'commit', '-m', "init"])
    subprocess.run(['git', 'push', '-u', 'origin', 'master'])




# subprocess.run(['git', 'checkout', '-B', 'new-branch'])
# subprocess.run(['git', 'add', '.'])
# subprocess.run(['git', 'commit', '--allow-empty', '-m', "New commit message"])
# subprocess.run(['git', 'push', '-u', 'origin', 'new-branch'])
# subprocess.run(['gh', 'pr', 'create', '-f'])
# subprocess.run(['gh', 'pr', 'merge', '--merge', '--delete-branch'])
# sleep(40)
