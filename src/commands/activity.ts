import { chalk, argv, echo, fs, path } from "zx"
import { loadConfig } from "../config.js"

import {
  exitWithError,
  finishExecution,
  getFolderNameByNumber,
  getModuleNumber,
} from "../utils.js"

const dryRun = argv?.["dry-run"] ?? false
const includeSolved = () => argv.solved || argv.s

export const printUsage = () => {
  console.log(`
 ${chalk.bold("bb activity ")}
   Publish one or more activities from fullstack-ground to the class gitlab repo

 ${chalk.bold("Usage")}
   bb activity [options] <activityNumber> <...additionalActivityNumbers>

 ${chalk.bold("Options")}
   --verbose            echo commands
   --help, -h           print help
   --solved, -s         include solutions
   --module             module number to draw from
   --dry-run            Don't actually process
`)
}

const copyActivity =
  (moduleName: string) =>
  async (activityNumber: string): Promise<void> => {
    const config = await loadConfig()
    const baseSrc = path.join(
      config.instructorDir,
      "01-Class-Content",
      moduleName,
      "01-Activities"
    )
    const activityName = await getFolderNameByNumber(
      baseSrc,
      parseInt(activityNumber, 10)
    )
    if (!activityName) {
      exitWithError(
        `Could not find related activity name for number '${activityNumber}'`
      )
    }
    const src = path.join(baseSrc, activityName)
    const destination = path.join(
      config.studentDir,
      moduleName,
      "01-Activities",
      activityName
    )

    echo(`  > ${activityName} Activity`)
    if (!dryRun) {
      await fs.copy(src, destination)
      if (!includeSolved()) {
        await fs.remove(path.join(destination, "Solved"))
        await fs.remove(path.join(destination, "Main"))
      }
    }
  }

export const run = async () => {
  const config = await loadConfig()
  const moduleNumber = await getModuleNumber()
  const activityNumbers = argv._.slice(1)

  const moduleName = await getFolderNameByNumber(
    path.join(config.instructorDir, "01-Class-Content"),
    moduleNumber
  )

  if (!moduleName) {
    exitWithError("You must specify a module number")
  }

  echo(`Copying ${moduleName}...`)
  const processActivities = activityNumbers.map(copyActivity(moduleName))
  await Promise.all(processActivities)
  finishExecution()
}
