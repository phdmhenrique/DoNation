import FacebookMedia from "../../Icons/FacebookMedia";
import XMedia from "../../Icons/XMedia";
import TiktokMedia from "../../Icons/TiktokMedia";
import InstagramMedia from "../../Icons/InstagramMedia";

const Footer = () => {
  return (
    <footer className="w-full max-w-[144rem] mx-auto">
      <div className="w-full h-full flex flex-col items-center p-[7rem_4.1rem_0] md:p-[7rem_2rem_0]">
        <div className="w-full max-w-[100.9rem] min-h-[32.1rem] border-t border-gray-200 bg-white p-[4.1rem] flex flex-col justify-between md:p-0">
          <div className="flex flex-wrap gap-8 justify-between sm:justify-around">
            <ul className="flex flex-col gap-6">
              <span className="text-gray-400 text-lg font-bold pb-2">Sobre</span>
              <li className="text-black text-lg font-medium cursor-pointer">Termos</li>
              <li className="text-black text-lg font-medium cursor-pointer">Privacidade</li>
              <li className="text-black text-lg font-medium cursor-pointer">Disclaimer</li>
              <li className="text-black text-lg font-medium cursor-pointer">Termos de Uso</li>
            </ul>
            <ul className="flex flex-col gap-6">
              <span className="text-gray-400 text-lg font-bold pb-2">FAQ</span>
              <li className="text-black text-lg font-medium cursor-pointer">Política de Reclamações</li>
              <li className="text-black text-lg font-medium cursor-pointer">Aviso de Cookies</li>
              <li className="text-black text-lg font-medium cursor-pointer">DMCA</li>
              <li className="text-black text-lg font-medium cursor-pointer">USC 2257</li>
            </ul>
            <ul className="flex flex-col gap-6">
              <span className="text-gray-400 text-lg font-bold pb-2">Contato</span>
              <li className="text-black text-lg font-medium cursor-pointer">Ajuda</li>
              <li className="text-black text-lg font-medium cursor-pointer">Referência</li>
              <li className="text-black text-lg font-medium cursor-pointer">Contrato Padrão</li>
              <div className="flex flex-col gap-2">
                <span className="text-gray-600 text-lg font-bold">Compartilhe o DoNation</span>
                <div className="flex gap-4 items-center">
                  <FacebookMedia />
                  <XMedia />
                  <TiktokMedia />
                  <InstagramMedia />
                </div>
              </div>
            </ul>
          </div>
          <div className="flex items-center justify-center text-lg text-black opacity-75 py-8">
            © 2024 DoNation. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
