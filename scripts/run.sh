cd ../dotnet-service
dotnet publish -c Release
cd ../
mkdir public/LuceneNet
cp -r dotnet-service/bin/Release/net9.0/browser-wasm/AppBundle/* public/LuceneNet
cp -r dotnet-service/bin/Release/net9.0/browser-wasm/AppBundle/_framework/* public/LuceneNet
npm run next:dev
