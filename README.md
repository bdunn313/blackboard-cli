# blackboard-cli

CLI for helping with course-related activities.

## Installation

```sh
# Install it globally
npm i -g @bdunn313/blackboard-cli
# Now you have access to it!
bb help
# You can publish activities
bb activity 1 2 3 4 5 --module 3
# And challenges
bb challenge --module 3
```

## Contributing

### Locally testing your changes

```sh
# Link this project locally
$ npm run build && npm link
# Now, you will have the `bb` command locally and can test out changes
$ bb help
```
