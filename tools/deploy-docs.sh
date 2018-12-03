echo '编译文档.........'

node_modules/.bin/gitbook build

echo '克隆文档分支.........'

git checkout gh-pages

cp -R _book/* .

git add .

git commit -m 'deploy host-app docs'

git push origin gh-pages

echo '部署完成切回.........'

git checkout master
