import { mnui as localMnui } from '../../../dist/mnui.js'
import { mnui as remoteMnui } from 'https://unpkg.com/@jniac/mnui@1.0.5/dist/mnui.js'

const dev = /:\d{4,5}$/.test(window.location.host)

export const mnui = dev ? localMnui : remoteMnui
