const style = document.createElement('style')

style.innerHTML = /* css */ `
  
  @import url(https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=block);
  
  #mnui, #mnui * {
    position: relative;
    box-sizing: border-box;
  }

  #mnui {
    --label-size: 140px;
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
    width: 280px;
    backdrop-filter: blur(16px) brightness(1.15);
    -webkit-backdrop-filter: blur(16px) brightness(1.15);
  }

  #mnui > * {
    pointer-events: all;
  }

  #mnui .group {
    border: solid 1px black;
    padding: 4px;
    width: 100%;
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
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-left: 16px;
  }

  #mnui .group.collapsed::after {
    transform: translate(-8px, 10px) rotate(-45deg);
  }

  #mnui .group.collapsed .contents {
    display: none;
  }

  #mnui .field {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2px;
    overflow: hidden;
  }

  #mnui .field:hover {
    font-weight: 500;
    color: #06f;
  }

  #mnui .field + .field {
    border-top: solid 1px black;
  }


  #mnui .field > .label {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    flex: 0 0 var(--label-size);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #mnui .field > .input {
    flex: 1 0 0;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #mnui .field > .input > * {
    width: 100%;
  }

  #mnui .field > * + * {
    margin-left: 4px;
  }

  #mnui .field .value {
    padding-left: 4px;
    font-size: .66em;
  }

  #mnui .field.button.switch.switch-on {
    font-weight: 600;
    font-style: italic;
  }

  #mnui .field.button.switch.switch-off {
    font-weight: 300;
    font-style: none;
  }

  #mnui .field.button button {
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
  #mnui .field .name {
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
  #mnui .field.button {
    border-radius: 0;
    width: unset;
    height: unset;
    top: unset;
    left: unset;
  }
  
  #mnui .field.button:hover {
    background: unset;
  }
  /*
    BAD-CSS-CONFLICT <-
  */
`

document.head.append(style)

export {}
