/**
 * Pre-start is where we want to place things that must run BEFORE the express
 * server is started. This is useful for environment variables, command-line
 * arguments, and cron-jobs.
 */

import path from 'path'
import dotenv from 'dotenv'
import { parse } from 'ts-command-line-args'

interface IArgs {
  env: string
}

// Command line arguments
const args = parse<IArgs>({
  env: {
    type: String,
    defaultValue: 'development',
    alias: 'e'
  }
})

// Set the env file
const loadEnv = (env: string) => {
  const result = dotenv.config({
    path: path.join(__dirname, `../env/${env}.env`)
  })
  if (result.error) {
    throw result.error
  }
}

if (args.env == 'development') loadEnv('')

loadEnv(args.env)
