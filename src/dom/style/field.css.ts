export const fieldCss = /* css */`

#mnui .field {
  height: var(--line-height);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding-right: 4px;
}

#mnui .field > .label {
  flex: 1;
  padding-left: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

#mnui .field > .label > .name {
  cursor: none;
}

#mnui .field > .input {
  flex: 0 0 var(--input-width);
  display: flex;
  flex-direction: row;
  align-items: center;
}

#mnui .field > .input > * {
  flex: 1;
}

`