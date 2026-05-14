rm -r docs
rm -r dotnet-service/bin/
cd dotnet-service
dotnet publish -c Release
cd ../
rm dotnet-service/bin/Release/net9.0/browser-wasm/AppBundle/index.html
npm run next:build
mkdir ./docs/LuceneNet
cp -r dotnet-service/bin/Release/net9.0/browser-wasm/AppBundle/* ./docs/LuceneNet
cp -r dotnet-service/bin/Release/net9.0/browser-wasm/AppBundle/_framework/* ./docs/LuceneNet
touch ./docs/.nojekyll # The _ in _next causes issues with GH Pages
