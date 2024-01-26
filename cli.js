#!/usr/bin/env node
var args = process.argv.splice(2)
var convert = require('./')
var fs = require('fs')

var file = args[0]
var mong = convert(fs.readFileSync(file).toString())
process.stdout.write(mong)
process.stdout.write("\n")