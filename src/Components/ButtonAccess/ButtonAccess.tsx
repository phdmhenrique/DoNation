import React from "react";
import { ButtonSocialMedia } from './ButtonAccess.ts';

import Google from '../../Icons/Google.jsx';
import Facebook from '../../Icons/Facebook.jsx';
import X from '../../Icons/X.jsx';

interface ButtonAccessProps {
  icon: React.ReactNode;
  text: String;
}

function ButtonAccess({ icon, text }: ButtonAccessProps) {
  let iconComponent;

  // Determina o ícone com base na prop 'icone'
  switch (icon) {
    case 'google':
      iconComponent = <Google />;
      break;
    case 'facebook':
      iconComponent = <Facebook />;
      break;
    case 'x':
      iconComponent = <X />;
      break;
    default:
      iconComponent = null;
  }

  return (
    <ButtonSocialMedia className='button__social-media'>
      {iconComponent}
      {text}
    </ButtonSocialMedia>
  );
}

export default ButtonAccess;
