#!/usr/bin/node

import { spawn } from 'child_process'
import { watch } from 'chokidar'

console.log('start develop')

watch('src').on('change', event => {
  spawn('yarn', ['build'], { stdio: 'inherit' })
})

spawn('yarn', ['build'], { stdio: 'inherit' })

console.log('watching "src"...')
