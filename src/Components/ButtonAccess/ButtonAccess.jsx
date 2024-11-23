'use client'; // Adicionando o "use client" no topo para garantir que o código seja renderizado no lado do cliente

import React from 'react';
import Google from '../../Icons/Google.jsx';
import Facebook from '../../Icons/Facebook.jsx';
import X from '../../Icons/X.jsx';

function ButtonAccess({ icon, text }) {
  let iconComponent;

  // Determina o ícone com base na prop 'icon'
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
    <div className="w-[20.3rem] h-[4rem] flex items-center gap-[1.2rem] px-[1rem] border-[0.1rem] border-gray-300 rounded-lg text-gray-500 text-[1.4rem] font-medium cursor-pointer transition-all duration-100 ease-in-out hover:text-gray-800 hover:text-[1.42rem]">
      {iconComponent}
      {text}
    </div>
  );
}

export default ButtonAccess;
