import { chalk, argv, echo, fs, path } from "zx"
import { loadConfig } from "../config.js"

import {
  finishExecution,
  getFolderNameByNumber,
  getModuleNumber,
} from "../utils.js"

const dryRun = argv?.["dry-run"] ?? false
const includeSolved = () => argv.solved || argv.s

export const printUsage = () => {
  console.log(`
 ${chalk.bold("bb activity ")}
   Publish the challenge for a module from fullstack-ground to the class gitlab repo

 ${chalk.bold("Usage")}
   bb challenge [options]

 ${chalk.bold("Options")}
   --verbose            echo commands
   --help, -h           print help
   --solved, -s         include solutions
   --module             module number to draw from
   --dry-run            Don't actually process
`)
}

export const run = async () => {
  const config = await loadConfig()
  const moduleNumber = await getModuleNumber()
  const moduleName = await getFolderNameByNumber(
    path.join(config.instructorDir, "01-Class-Content"),
    moduleNumber
  )
  echo(`Copying ${moduleName} Challenge...`)
  const src = path.join(
    config.instructorDir,
    "01-Class-Content",
    moduleName,
    "02-Challenge"
  )
  const destination = path.join(config.studentDir, moduleName, "02-Challenge")

  if (!dryRun) {
    await fs.copy(src, destination)
    if (!includeSolved()) {
      await fs.remove(path.join(destination, "Main"))
    }
  }
  finishExecution()
}
