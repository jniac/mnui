export const buttonCss = /* css */`

#mnui .button {
  padding: 4px;
  padding-left: var(--padding-left);
}

#mnui .button > div {
  transform: translateY(1px);
  width: 100%;
  height: 100%;
}

#mnui .button > div::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color);
  opacity: .2;
  border-radius: 2px;
  pointer-events: none;
  transition: opacity var(--hover-transition);
}

#mnui .button > div:hover::before {
  opacity: .33;
} 

#mnui .button button {
  width: 100%;
  height: 100%;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
  border: none;
  text-align: center;
  cursor: pointer;
}

`