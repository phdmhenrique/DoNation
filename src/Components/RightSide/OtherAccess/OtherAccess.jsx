import ButtonAccess from '../../ButtonAccess/ButtonAccess.jsx';

export default function OtherAccess() {
  return (
    <>
      <p className="text-gray-500 text-[16px] font-medium pt-6 pb-4">ou</p>
      <span className="text-gray-700 text-[16px] font-bold">Acesse com</span>

      <ButtonAccess icon="google" text="Acesse com o Google" />
      <ButtonAccess icon="facebook" text="Acesse com o Facebook" />
      <ButtonAccess icon="x" text="Acesse com o X" />
    </>
  );
}
