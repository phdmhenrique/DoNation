import MaskedInput from "react-text-mask";
import {
  Container,
  RightsideLabel,
  StyledInput,
  RightsideInputs,
  StyledField,
  StyledInfo,
} from "./StageInputs.ts";
import DatePickerField from "../DatePickerField/DatePickerField.tsx";
import DropdownForm from "../DropdownForm/DropdownForm.tsx";
import { isValid } from "date-fns";

const phoneNumberMask = [
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const stateOptions = [
  { value: "none", label: "Selecionar" },
  { value: "ACRE", label: "Acre" },
  { value: "ALAGOAS", label: "Alagoas" },
  { value: "AMAPA", label: "Amapá" },
  { value: "AMAZONAS", label: "Amazonas" },
  { value: "BAHIA", label: "Bahia" },
  { value: "CEARA", label: "Ceará" },
  { value: "DISTRITO_FEDERAL", label: "Distrito Federal" },
  { value: "ESPIRITO_SANTO", label: "Espírito Santo" },
  { value: "GOIAS", label: "Goiás" },
  { value: "MARANHAO", label: "Maranhão" },
  { value: "MATO_GROSSO", label: "Mato Grosso" },
  { value: "MATO_GROSSO_DO_SUL", label: "Mato Grosso do Sul" },
  { value: "MINAS_GERAIS", label: "Minas Gerais" },
  { value: "PARA", label: "Pará" },
  { value: "PARAIBA", label: "Paraíba" },
  { value: "PARANA", label: "Paraná" },
  { value: "PERNAMBUCO", label: "Pernambuco" },
  { value: "PIAUI", label: "Piauí" },
  { value: "RIO_DE_JANEIRO", label: "Rio de Janeiro" },
  { value: "RIO_GRANDE_DO_NORTE", label: "Rio Grande do Norte" },
  { value: "RIO_GRANDE_DO_SUL", label: "Rio Grande do Sul" },
  { value: "RONDONIA", label: "Rondônia" },
  { value: "RORAIMA", label: "Roraima" },
  { value: "SANTA_CATARINA", label: "Santa Catarina" },
  { value: "SAO_PAULO", label: "São Paulo" },
  { value: "SERGIPE", label: "Sergipe" },
  { value: "TOCANTINS", label: "Tocantins" },
];

const cityOptions = [
  { value: "none", label: "Selecionar" },
  { value: "saopaulo", label: "São Paulo" },
  { value: "registro", label: "Registro" },
  { value: "cajati", label: "Cajati" },
  { value: "jacupiranga", label: "Jacupiranga" },
  { value: "pariquera-acu", label: "Pariquera-Açu" },
  { value: "juquia", label: "Juquiá" },
];

interface FormData {
  phone: string;
  birthday: { date: string; isValidDate: boolean };
  state: string;
  city: string;
}

interface StageInputsProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

const StageInputs = ({ formData, updateFormData }: StageInputsProps) => {
  // Função para converter o telefone do formato "12 31421-3142" para "(12)31421-3142"
  const formatPhoneNumberForBackend = (phone: string) => {
    const cleanedPhone = phone.replace(/\D/g, "");
    const formattedPhone = `(${cleanedPhone.slice(0, 2)})${cleanedPhone.slice(
      2,
      7
    )}-${cleanedPhone.slice(7)}`;
    return formattedPhone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    updateFormData("phone", phone); // Atualiza o valor no formulário
    const formattedPhone = formatPhoneNumberForBackend(phone); // Converte para o formato do backend
    updateFormData("phone", formattedPhone); // Aqui você pode enviar o número no formato correto para o backend
  };

  // Função para formatar e garantir que a data seja válida
  const handleDateChange = (date: string | null, isValidDate: boolean) => {
    console.log("entrou na handleDateChange no StageInputs.jsx", date, isValidDate);

    if (date && isValidDate) {
      // Se a data for válida, formate a data e atualize o estado
      updateFormData("birthday", { date, isValidDate });
    } else {
      updateFormData("birthday", { date: "", isValidDate: false });
    }
  };

  return (
    <Container>
      <RightsideInputs className="rightside-inputs">
        <RightsideLabel>Seu número de telefone</RightsideLabel>
        <StyledField>
          <StyledInfo>+55</StyledInfo>
          <StyledInput
            as={MaskedInput}
            mask={phoneNumberMask}
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="99 99999-9999"
          />
        </StyledField>
      </RightsideInputs>

      <RightsideInputs className="rightside-inputs">
        <RightsideLabel>Sua data de nascimento</RightsideLabel>
        <DatePickerField
          value={formData.birthday.date || ""}
          isValidDate={formData.birthday?.isValidDate || false}
          onChange={handleDateChange} // Passando a função corrigida
        />
      </RightsideInputs>

      <RightsideInputs className="rightside-inputs">
        <RightsideLabel>Estado</RightsideLabel>
        <DropdownForm
          value={formData.state}
          onChange={(value: string) => updateFormData("state", value)}
          options={stateOptions}
        />
      </RightsideInputs>

      <RightsideInputs className="rightside-inputs">
        <RightsideLabel>Cidade</RightsideLabel>
        <DropdownForm
          value={formData.city}
          onChange={(value: string) => updateFormData("city", value)}
          options={cityOptions}
        />
      </RightsideInputs>
    </Container>
  );
};

export default StageInputs;
