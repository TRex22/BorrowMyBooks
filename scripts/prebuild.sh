#!/bin/bash
echo 'prebuild...'
echo 'setup git'
git config --global user.email "travis.bot@jasonchalom.com"
git config --global user.name "travis.bot"

echo 'move to source folder'
cd src/

echo'install all'
sudo bash install.sh

