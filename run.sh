cd dotnet-service
dotnet publish -c Release
cd ../
mkdir public
cp -r dotnet-service/bin/Release/net9.0/browser-wasm/AppBundle/* public
cp -r dotnet-service/bin/Release/net9.0/browser-wasm/AppBundle/_framework/* public
yarn run next:dev