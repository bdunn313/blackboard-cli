# blackboard-cli

CLI for helping with course-related activities.

## Installation

```sh
# Install it globally
npm i -g @bdunn313/blackboard-cli
# create a config file
echo '{"instructorDir": "", "studentDir": ""}' > ~/.bbconfig.json
# Now you have access to it!
bb help
# You can publish activities
bb activity 1 2 3 4 5 --module 3
# And challenges
bb challenge --module 3
```

### Configuration

Make sure you have an absolute path for your instructor and student course directories specified in a config file in your home directory called `.bbconfig.json`. Here's an example:

```json
{
  "instructorDir": "/path/to/code/repo/fullstack-ground",
  "studentDir": "/path/to/code/repo/course-gitlab"
}
```

## Contributing

### Writing new commands

New commands should be put in the `src/commands` directory and should be named after the subcommand. For example, if you wanted to create `foo` subcommand, you would create `src/commands/foo.ts`.

Commands should export 2 functions: `printUsage()` and `run()`. `printUsage()` is used when `bb help <command>` is called. `run()` is executed when `bb <command>` is ran.

This package currently relies heavily on the `zx` package made by google. This gives us a lot for interacting with the command line and a bunch of convenience methods - it's probably all we need. That said, if another dependency needs to be introduced, that's OK!

### Locally testing your changes

```sh
# Link this project locally
$ npm run build && npm link
# Now, you will have the `bb` command locally and can test out changes
$ bb help
```
