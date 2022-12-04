import { createRequire } from "node:module"
import { $, chalk, echo, argv, question } from "zx"

export const getVersion = () =>
  createRequire(import.meta.url)("../package.json").version

export const exitWithError = (msg: string) => {
  console.error(chalk.red(msg))
  process.exit(1)
}

export const finishExecution = () => {
  const includeSolved = argv.solved || argv.s
  if (includeSolved) {
    echo(chalk.blueBright("Copying solutions..."))
  } else {
    echo(chalk.blueBright(`Solutions were not copied...`))
  }

  echo(chalk.greenBright("Done!"))
}

export const getFolderNameByNumber = async (
  dir: string,
  num: number
): Promise<string> => {
  const parsedNum = num < 10 ? `0${num}` : `${num}`
  const result = await $`ls ${dir}`
    .quiet()
    .pipe($`grep ${parsedNum}-`)
    .quiet()
  return result.stdout.trim()
}

export const getModuleNumber = async () =>
  argv.module ?? question("What module number? ")
