import { os, fs } from "zx"

type Config = {
  instructorDir: string
  studentDir: string
}

let config: Config
export const loadConfig = async (): Promise<Config> => {
  if (!config) {
    config = await fs.readJSON(`${os.homedir}/.bbconfig.json`)
  }
  return config
}
