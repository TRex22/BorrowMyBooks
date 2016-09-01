#!/bin/bash
#make docs
mkdir docs
mkdir docs/deps
npm test #coverage report

madge --image docs/deps/server_www.svg bin/www
madge --image docs/deps/app.svg app.js
