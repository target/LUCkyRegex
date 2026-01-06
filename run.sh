cd dotnet-service
dotnet publish -c Release
cd ../
mkdir public
cp -r dotnet-service/bin/Release/net7.0/browser-wasm/AppBundle/* public
yarn run next:dev