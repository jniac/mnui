export const rangeCss = /* css */`

#mnui .range input[type=range] {
  opacity: 0;
}

#mnui .range {
  --track-height: 3px;
  --thumb-width: var(--track-height);
  --thumb-height: 12px;
  --thumb-padding: 1.5px;
  --position: .5;
  --after-opacity: .5;
}

#mnui .range .simple-input {
  flex: 0 0 38px;
  margin-right: 4px;
}

#mnui .range > .label > .info {
  margin-left: 4px;
  opacity: .66;
  cursor: pointer;
  font-size: .8em;
}

#mnui .range .input.focused,
#mnui .range .input.hovered {
  --color: var(--active-color);
  color: var(--color);
  opacity: 1;
}

`