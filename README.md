DASHBOARD

http://greenbuilding-cmpe281.s3-website-us-west-1.amazonaws.com


Get front end running in Mac OSX

* Install Homebrew
  1. Go to https://brew.sh/ and follow the instruction to install homebrew

* Install NVM (Optional)
  1. `brew update`
  2. `brew install nvm`
  3. `source $(brew --prefix nvm)/nvm.sh`

* Install NodeJS
  1. go to https://nodejs.org/en/download/ and download and install NodeJS
  2. OR, ` nvm install 10.13.0`

* Install yarn
  1. `brew install yarn`

* Install create-react-app
  1. `yarn global add create-react-app`

* Clone down the repo, and cd into `client` directory, and run the app
  1. `git clone https://github.com/Green-Building/dashboard.git`
  2. `cd client` `yarn install`
  3. `yarn start`
  4. application should start at port 3002

Get front end running in Windows

* Install NodeJS
  1. go to https://nodejs.org/en/download/ and download and install NodeJS

* Install yarn
  1. go to https://yarnpkg.com/lang/en/docs/install/#windows-stable and install yarn

* Install git
  1. go to https://git-scm.com/download/win to download git

* Install create-react-app
  1. search for `Node.js command prompt`, and open the prompt terminal
  1. `yarn global add create-react-app`

* Clone down the repo, and cd into `client` directory, and run the app
  1. `git clone https://github.com/Green-Building/dashboard.git`
  2. `cd client` `yarn install`
  3. `yarn start`
  4. application should start at port 3002
