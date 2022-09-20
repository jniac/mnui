const style = document.createElement('style')

style.innerHTML = /* css */ `
  
  @import url(https://cdnjs.cloudflare.com/ajax/libs/firacode/6.2.0/fira_code.css);

  #mnui, #mnui * {
    position: relative;
    box-sizing: border-box;
  }

  #mnui {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 14px;
    padding: 4px;
    font-family: 'Fira Code', monospace;
  }

  #mnui > .wrapper {
    backdrop-filter: blur(16px) brightness(1.15);
    -webkit-backdrop-filter: blur(16px) brightness(1.15);
  }

  #mnui > * {
    pointer-events: all;
  }

  #mnui .group {
    border: solid 1px black;
    padding: 4px;
    width: 320px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    user-select: none;
  }

  #mnui .group + .group {
    border-top: none;
  }

  #mnui .group::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    top: 0;
    right: 0;
    border-left: solid 1px black;
    border-bottom: solid 1px black;
    transform: translate(-5px, 10px) rotate(45deg);
  }

  #mnui .group > .name {
    text-decoration: underline;
    cursor: pointer;
  }

  #mnui .group .contents {
    padding-left: 16px;
  }

  #mnui .group.collapsed::after {
    transform: translate(-8px, 10px) rotate(-45deg);
  }

  #mnui .group.collapsed .contents {
    display: none;
  }

  #mnui div.input {
    max-width: 320px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px;
  }

  #mnui div.input:hover {
    font-weight: 500;
    color: #06f;
  }

  #mnui div.input + div.input {
    border-top: solid 1px black;
  }


  #mnui div.input > .label {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 0 0 140px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #mnui div.input > .label + * {
    flex: 1 0 0;
  }

  #mnui div.input > * + * {
    margin-left: 4px;
  }

  #mnui div.input .value {
    padding-left: 4px;
    font-size: .66em;
  }

  #mnui div.input.button.switch.switch-on {
    font-weight: 600;
    font-style: italic;
  }

  #mnui div.input.button.switch.switch-off {
    font-weight: 300;
    font-style: none;
  }

  #mnui div.input.button button {
    flex: 1 0 0;
    font-weight: inherit;
    font-style: inherit;
  }

  #mnui button,
  #mnui select {
    font-family: inherit;
  }
  #mnui button.selected {
    font-weight: 900;
  }
  #mnui div.input .name {
    cursor: pointer;
  }

  #mnui .buttons {
    display: flex;
    flex-wrap: wrap;
  }

  /* 
    BAD-CSS-CONFLICT ->
    Because of conflicts with some bad-css somewhere. 
  */
    #mnui div.input.button {
    border-radius: 0;
    width: unset;
    height: unset;
    top: unset;
    left: unset;
  }
  
  #mnui div.input.button:hover {
    background: unset;
  }
  /*
    BAD-CSS-CONFLICT <-
  */
`

document.head.append(style)

export {}
