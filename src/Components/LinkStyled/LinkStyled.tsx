import React, { ReactNode } from 'react';
import { LinkStyledUi } from './LinkStyled.ts';

interface LinkStyledProps {
  children: ReactNode;
  to: string;
  path?: string;
  className?: string;
}

function LinkStyled({ children, to, path, className }: LinkStyledProps) {
  return (
    <LinkStyledUi to={to} path={path} className={className}>
      {children}
    </LinkStyledUi>
  );
}

export default LinkStyled;
