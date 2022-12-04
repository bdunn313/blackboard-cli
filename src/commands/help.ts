import { chalk, argv } from "zx"

import { getVersion } from "../utils.js"

export async function printCommandUsage(passedCommand?: string) {
  const command = passedCommand ?? argv?._?.[1]?.trim()?.toLowerCase()
  try {
    const commandImport = await import(`./${command}.js`)
    commandImport.printUsage()
    return
  } catch (e) {
    console.log(chalk.red("Unknown command!"))
  }

  printUsage()
  return
}

function printUsage() {
  console.log(`
 ${chalk.bold("blackboard (bb) " + getVersion())}
   A tool for managing the bootcamp classroom

 ${chalk.bold("Usage")}
   bb <command> [options]

 ${chalk.bold("Options")}
   --verbose            echo commands
   --version, -v        print current bb version
   --help, -h           print help

 ${chalk.bold("Commands")}
   help                 Show additional help about another command
   activity             Publish one or more activities to local copy of the course repo
   challenge            Publish a module challenge to local copy of course repo
`)
}

export const run = () => printUsage()

export default printUsage
