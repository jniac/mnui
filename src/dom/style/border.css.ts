export const borderCss = /* css */`

#mnui {
  border: solid 1px var(--color);
}

#mnui .group + .group {
  border-top: solid 1px var(--color);
}

#mnui .group > .content > * + * {
  border-top: solid 1px transparent;
}

#mnui .group > .content {
  /* placeholder */
  border-top: solid 1px transparent;
}

#mnui .group > .content > * + *::after,
#mnui .group > .content::after {
  --padding: 4px;
  content: '';
  position: absolute;
  left: var(--padding);
  right: var(--padding);
  height: 1px;
  top: 0;
  background-color: var(--color);
  opacity: .5;
}

`