import React, { ReactNode } from 'react';
import { Container } from './FullSize.ts';

interface FullSizeProps {
  children: ReactNode;
}

function FullSize({ children }: FullSizeProps) {
  return <Container className="fullsize">{children}</Container>;
}

export default FullSize;
