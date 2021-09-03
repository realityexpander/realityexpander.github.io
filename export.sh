#!/bin/bash
cd /Users/chrisathanas/Dropbox\ \(Personal\)/My\ Mac\ \(Chriss-MBP.attlocal.net\)/Desktop/dev/Bootstrap\ Upload\ to\ Github/realityexpander.github.io

git add -A
git commit -m "Website update."
git push origin master3


git status >> ../error.log
pwd >> ../error.log
 