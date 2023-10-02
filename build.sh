rm -r docs
rm -r dotnet-service/bin/
cd dotnet-service
dotnet publish -c Release
cd ../
rm dotnet-service/bin/Release/net7.0/browser-wasm/AppBundle/index.html
yarn run build
cp -r dotnet-service/bin/Release/net7.0/browser-wasm/AppBundle/* ./docs
touch ./docs/.nojekyll # The _ in _next causes issues with GH Pages