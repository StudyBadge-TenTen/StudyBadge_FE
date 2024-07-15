  
#!/bin/sh

cd ./

mkdir output

cp -R ./StudyBadge_FE/* ./output

cp ./StudyBadge_FE/package.json ./output

cp -R ./output ./StudyBadge/
