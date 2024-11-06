// StagesInputs.jsx
import React from 'react';
import { Container, RightsideLabel, StyledInput, RightsideInputs, StyledField, StyledInfo } from './StageInputs.js';
import MaskedInput from 'react-text-mask';
import { subYears } from 'date-fns';
import DatePickerField from '../DatePickerField/DatePickerField.jsx';
import DropdownForm from '../DropdownForm/DropdownForm.jsx'

const phoneNumberMask = [
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const stateOptions = [
  { value: 'none', label: 'Selecionar' },
  { value: 'sp', label: 'São Paulo' },
  { value: 'rj', label: 'Rio de Janeiro' },
  { value: 'mg', label: 'Minas Gerais' },
  { value: 'ba', label: 'Bahia' },
  { value: 'pr', label: 'Paraná' },
  { value: 'am', label: 'Amazonas' },
];

const cityOptions = [
  { value: 'none', label: 'Selecionar' },
  { value: 'saopaulo', label: 'São Paulo' },
  { value: 'registro', label: 'Registro' },
  { value: 'cajati', label: 'Cajati' },
  { value: 'jacupiranga', label: 'Jacupiranga' },
  { value: 'pariquera-acu', label: 'Pariquera-Açu' },
  { value: 'juquia', label: 'Juquiá' },
];

const StagesInputs = ({ formData, updateFormData}) => {
  const initialDate = subYears(new Date(), 18);
  const dateFormatMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

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
            onChange={(e) => updateFormData('phone', e.target.value)}
            placeholder="99 99999-9999"
          />
        </StyledField>
      </RightsideInputs>

      <RightsideInputs className="rightside-inputs">
        <RightsideLabel>Sua data de nascimento</RightsideLabel>
        <DatePickerField
          value={formData.birthday}
          onChange={(value) => {
            console.log("Data de nascimento selecionada:", value); // Log da data escolhida
            updateFormData('birthday', value)}
          }
            maxDate={initialDate}
          dateFormatMask={dateFormatMask}
        />
      </RightsideInputs>

      <RightsideInputs className="rightside-inputs">
        <RightsideLabel>Estado</RightsideLabel>
        <DropdownForm
          value={formData.state}
          onChange={(value) => updateFormData('state', value)}
          options={stateOptions}
        />
      </RightsideInputs>

      <RightsideInputs className="rightside-inputs">
        <RightsideLabel>Cidade</RightsideLabel>
        <DropdownForm
          value={formData.city}
          onChange={(value) => updateFormData('city', value)}
          options={cityOptions}
        />
      </RightsideInputs>
    </Container>
  );
};

export default StagesInputs;
