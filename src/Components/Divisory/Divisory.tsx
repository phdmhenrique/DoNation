import React, { ReactNode } from 'react';
import { Container } from './Divisory.ts';

interface DivisoryProps {
  children: ReactNode;
}

function Divisory({ children }: DivisoryProps) {
  return <Container className="divisory">{children}</Container>;
}

export default Divisory;
