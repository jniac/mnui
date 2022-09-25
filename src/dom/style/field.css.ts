export const fieldCss = /* css */`

#mnui .field {
  --padding-left: 4px;
  height: var(--line-height);
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 4px;
  padding-left: var(--padding-left);
}

#mnui .group .field {
  --padding-left: 12px;
}

#mnui .field > .label {
  margin-right: 8px;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
}

#mnui .field > .label > .name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#mnui .field > .input {
  flex: 0 0 var(--input-width);
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
}

#mnui .field > .input > * {
  flex: 1;
}

`