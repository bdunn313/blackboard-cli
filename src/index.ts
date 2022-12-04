#!/usr/bin/env node

import { createRequire } from "node:module"
import { chalk, argv } from "zx"
import printUsage, { printCommandUsage } from "./commands/help.js"

const getVersion = (): string =>
  createRequire(import.meta.url)("../package.json").version

async function main() {
  if (argv.version) {
    getVersion()
    return
  }
  const command = argv._?.[0]?.trim()?.toLowerCase()
  if (argv.help) {
    if (command) {
      printCommandUsage(command)
      return
    }
    printUsage()
    return
  }
  if (!command) {
    console.log(chalk.red("You must specify a command!"))
    printUsage()
    return
  }

  // Command parsing
  if (command === "help") {
    printCommandUsage()
    return
  }
  try {
    const commandImport = await import(`./commands/${command}.js`)
    await commandImport.run()
    return
  } catch (e) {
    console.log(chalk.red("Unknown command!"))
    printUsage()
  }

  return
}

main()
