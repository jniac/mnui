export const borderCss = /* css */`

#mnui {
  border: solid 1px transparent;
  border-radius: 6px;
}

#mnui .group + .group {
  border-top: solid 1px transparent;
}
#mnui .group + .group::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  top: 0;
  background-color: var(--color);
  opacity: .2;
}

#mnui .group > .content {
  /* placeholder */
  border-top: solid 1px transparent;
}

#mnui .group > .content::before {
  --padding: 4px;
  content: '';
  position: absolute;
  left: var(--padding);
  right: var(--padding);
  height: 1px;
  top: 0;
  background-color: var(--color);
  opacity: .2;
}



/* FIELD / GROUP */
#mnui .group > .content > * + * {
  border-top: solid 1px transparent;
}

#mnui .group > .content > * + *::before {
  --padding: 4px;
  content: '';
  position: absolute;
  left: calc(var(--padding) + 8px);
  right: var(--padding);
  height: 1px;
  top: 0;
  background-color: var(--color);
  opacity: .2;
}


`