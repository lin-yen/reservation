#!/bin/bash
# 檢查本機 node & npm 版本是否符合線上環境
checkNodeVersion=$(check-node-version --node $(cat .nvmrc) ; echo $?)
checkNpmVersion=$(check-node-version --npm 9.5.1 ; echo $?)
nodeVersion=$(node --version)
npmVersion=$(npm --version)

if [ "$checkNodeVersion" == 0 ] && [ "$checkNpmVersion" == 0 ];
then
  exit 0
else
  echo "* your node version: ${nodeVersion}"
  echo "* your npm version: ${npmVersion}"
  echo ">>> 本機開發環境 node 或 npm 版本與規範不符，請依照規範安裝並使用正確的版本執行"
  exit 1
fi;
