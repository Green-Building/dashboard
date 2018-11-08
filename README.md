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
  2. `cd client`
  3. `yarn install`
  4. `yarn start`
  5. application should start at port 3002

Running back end

* Install dependencies
  1. cd into dashboard, and `yarn install`
  2. `yarn global add sequelize-cli`
  3. `yarn global add nodemon`

* Setup MySQL Database
  1. create a database called <simulator>
  2. edit username and password in `./config/config.json` file. Environment will be `development`

* Generate Table and Seed data
  1. `sequelize db:migrate` to generate the table
  2. `sequelize db:seed:all` to populate seeds data in table
  3. visit http://docs.sequelizejs.com/manual/tutorial/migrations.html if you need more stuff

* Install MongoDB
  1. `brew install mongodb`
  2. follow the step in https://treehouse.github.io/installation-guides/mac/mongo-mac.html
  3. `mongod` to launch mongodb daemon
  4. go to https://robomongo.org/download to download client for MongoDB

* Spin up NodeJs Server
  1. cd into dashboard, and `nodemon index`
  2. the server will start at port 4001

