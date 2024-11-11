import MaskedInput from "react-text-mask";
import {
  Container,
  RightsideLabel,
  StyledInput,
  RightsideInputs,
  StyledField,
  StyledInfo,
} from "./StageInputs.js";
import DatePickerField from "../DatePickerField/DatePickerField.jsx";
import DropdownForm from "../DropdownForm/DropdownForm.jsx";
import dayjs from "dayjs"; // Importa o Day.js

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

const StageInputs = ({ formData, updateFormData }) => {
  // Função para converter o telefone do formato "12 31421-3142" para "(12)31421-3142"
  const formatPhoneNumberForBackend = (phone) => {
    const cleanedPhone = phone.replace(/\D/g, "");
    const formattedPhone = `(${cleanedPhone.slice(0, 2)})${cleanedPhone.slice(
      2,
      7
    )}-${cleanedPhone.slice(7)}`;
    return formattedPhone;
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    updateFormData("phone", phone); // Atualiza o valor no formulário
    const formattedPhone = formatPhoneNumberForBackend(phone); // Converte para o formato do backend
    updateFormData("phone", formattedPhone); // Aqui você pode enviar o número no formato correto para o backend
  };

  // Função para formatar e garantir que a data seja válida
  const handleDateChange = (date) => {
    const dayjsDate = dayjs(date).startOf("day");
    const isValid =
      dayjsDate.isValid() && dayjsDate.isBefore(dayjs().subtract(18, "years"));

    if (isValid) {
      const formattedDate = isValid ? dayjsDate.format("YYYY-MM-DD") : "";
      updateFormData("birthday", { date: formattedDate, isValidDate: isValid });
    } else {
      console.error("Data inválida ou menor de 18 anos:", date);
      updateFormData("birthday", "");
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
          value={formData.birthday?.date || ""}
          isValidDate={formData.birthday?.isValidDate || false}
          onChange={handleDateChange}
        />
      </RightsideInputs>

      <RightsideInputs className="rightside-inputs">
        <RightsideLabel>Estado</RightsideLabel>
        <DropdownForm
          value={formData.state}
          onChange={(value) => updateFormData("state", value)}
          options={stateOptions}
        />
      </RightsideInputs>

      <RightsideInputs className="rightside-inputs">
        <RightsideLabel>Cidade</RightsideLabel>
        <DropdownForm
          value={formData.city}
          onChange={(value) => updateFormData("city", value)}
          options={cityOptions}
        />
      </RightsideInputs>
    </Container>
  );
};

export default StageInputs;
