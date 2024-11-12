import React from 'react';
import { NoAccount } from './Account.ts';

interface NoAccountProps {
  text: string;
  children: React.ReactNode;
}

export default function Account({ text, children }: NoAccountProps) {
  return (
    <NoAccount>{text}{children}</NoAccount>
  );
}
