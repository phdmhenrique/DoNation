import React from 'react';
import { NoAccount } from './Account.ts';

interface NoAccountProps {
  text: string;
  children: React.ReactNode;
  className?: string
}

export default function Account({ text, children, className }: NoAccountProps) {
  return (
    <NoAccount className={className}>{text}{children}</NoAccount>
  );
}
