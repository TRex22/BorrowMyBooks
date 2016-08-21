#!/bin/bash
#make docs
npm test #coverage report
mr-doc -s ./ -o docs/ -n "Borrow My Books" -t "default"
