if [ $(git rev-parse --abbrev-ref HEAD) == 'master' ]
then
  standard-version
  version=$( jq -r .version ./package.json )
  git push origin master v$version
else
  echo "[錯誤] 建立新版本請至 master 分支進行！"
fi;
