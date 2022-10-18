# MNUI versions

## 1.0.7
- allow "undefined" value arg, for "pure" value retrieval: 
  ```ts
  mnui.range('a/b/c', 1, [0, 10])
  // somewhere else:
  mnui.range('a/b/c').onUserChange = value => {
    console.log(value)
  }
  ```
## 1.0.6
- "auto destroy": when an item (a "group" in facts) is empty after a `destroy()` 
  call, all the emptied parents are destroyed too.