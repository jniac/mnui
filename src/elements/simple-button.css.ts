export const simpleButtonCss = /* css */`

#mnui .simple-button {
  width: 100%;
  height: 100%;
}

#mnui .simple-button::before {
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

#mnui .simple-button:hover::before {
  opacity: .33;
} 

#mnui .simple-button button {
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