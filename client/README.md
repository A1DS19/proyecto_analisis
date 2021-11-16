# UI React, Redux, Redux toolkit, TS

## Deploy steps:

client:
yarn build
netlify deploy --prod
directorio: ./build

server:
git subtree push --prefix server heroku main;
