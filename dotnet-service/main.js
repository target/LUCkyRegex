// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { dotnet } from './dotnet.js'

// eslint-disable-next-line antfu/no-top-level-await
const { getAssemblyExports, getConfig } = await dotnet
  .withDiagnosticTracing(false)
  .withApplicationArgumentsFromQuery()
  .create()

const config = getConfig()

// eslint-disable-next-line antfu/no-top-level-await
const exports = await getAssemblyExports(config.mainAssemblyName)

// Exposing as a global since dotnet.js cannot be directly imported from next.js or
// other build processes without errors. This keeps the UI and .net builds separate.
window.testRegex = (regex, string, flags = 'none') => {
  return exports.LuckyRegexClass.Test(regex, string, flags)
}

if (document) {
  const ready = new Event('luckyRegexReady')
  document.dispatchEvent(ready)
  window.luckyRegexReady = true
}
