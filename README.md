# mnui 
Minimal UI kit for quick prototyping.

The kit allows to declare a dom inspector in a functional / declarative way:

```ts
import { mnui } from '@jniac/mnui'

const someState = { x: 5 }

const renderLoop = () => {

  mnui.group('My Component', () => {
    const active = mnui.button('active', { initialValue: true }, 'switch').value
    someState.x = mnui.range('x', someState.x, { min: 0, max: 10 }).value
  })
}
```

## Note
Use [Fira Code](https://github.com/tonsky/FiraCode) from [google fonts](https://fonts.google.com/specimen/Fira+Code?query=fira+code) for UI rendering.