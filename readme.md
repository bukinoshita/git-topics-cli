# git-topics-cli [![Build Status](https://travis-ci.org/bukinoshita/git-topics-cli.svg?branch=master)](https://travis-ci.org/bukinoshita/git-topics-cli)

> Auto create Github topics for repositories


## Install

```bash
npm install -g git-topics
```


## Usage

```bash
$ git-topics --help

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
```


## Related

- [git-topics](htts://github.com/bukinoshita/git-topics) — API for this module


## License

MIT © [Bu Kinoshita](https://bukinoshita.io)
