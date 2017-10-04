#!/usr/bin/env node
'use strict'

const SaveLocal = require('save-local')
const inquirer = require('inquirer')
const gitTopics = require('git-topics')
const meow = require('meow')
const shoutSuccess = require('shout-success')
const shoutError = require('shout-error')
const shoutMessage = require('shout-message')
const chalk = require('chalk')
const updateNotifier = require('update-notifier')

const saveLocal = new SaveLocal('git-topics-store')

const cli = meow(
  `
  Usage:
    $ git-topics                          create github topics for local project on the current directory
    $ git-topics <project-name>           create github topics for github project
    $ git-topics --auth                   github authentication

  Example:
    $ git-topics
    $ git-topics bukinoshita/git-topics
    $ git-topics --auth
    $ git-topics -t js,javascript

  Options:
    -a, --auth                            github authentication to be able to create topics
    -t, --topics                          github topics
    -h, --help                            show help options
    -v, --version                         show version
`,
  {
    alias: {
      a: 'auth',
      t: 'topics',
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const run = () => {
  if (cli.flags.auth) {
    return inquirer
      .prompt([
        {
          message: 'Your access token',
          name: 'token'
        }
      ])
      .then(({ token }) => saveLocal.set({ name: 'token', value: token }))
  }

  return saveLocal
    .get('token')
    .then(token => {
      if (!token) {
        return shoutError(
          `You don't have an access token. Please, create at https://github.com/settings/tokens/new and run ${chalk.bold(
            '$ git-topics --auth'
          )}.`
        )
      }

      const topics = cli.flags.t ? cli.flags.t.split(',') : undefined
      const project = cli.input[0] ? cli.input[0] : undefined

      if (!topics || !project) {
        shoutMessage(
          `Trying to get ${chalk.bold('topics')}/${chalk.bold(
            'project'
          )} from ${chalk.underline('keywords')} and ${chalk.underline(
            'repository'
          )} on ${chalk.italic('package.json')}.`
        )
      }

      return gitTopics(token, { topics, project })
        .then(() => shoutSuccess(`Github topics created successfully!`))
        .catch(err => shoutError(err))
    })
    .catch(err => shoutError(err))
}

run()
