# UI React, Redux, Redux toolkit, TS

## Deploy steps:

client:
yarn build
netlify deploy --prod

server:
git subtree push --prefix server heroku main;
