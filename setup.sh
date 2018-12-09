#!/bin/sh

sudo apt-get update -y
sudo apt-get install -y docker
sudo service docker start

sudo apt-get install -y git

git clone https://github.com/Green-Building/dashboard.git

sudo docker build -t dash/dashboard dashboard/

sudo docker run -d -p 4001:4001 dash/dashboard