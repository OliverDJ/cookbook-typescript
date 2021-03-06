set arg1=%1
set arg2=%2

cd %arg1%
npm ci && npm run test:ci && npm run lint && npm run build
cd %arg2%