import React, { ReactNode } from 'react';
import { LinkStyledUi } from './LinkStyled.ts';

interface LinkStyledProps {
  children: ReactNode;
  to: string;
  path?: string;
}

function LinkStyled({ children, to, path }: LinkStyledProps) {
  return (
    <LinkStyledUi to={to} path={path}>
      {children}
    </LinkStyledUi>
  );
}

export default LinkStyled;
