import React, { useState, useRef } from "react";
import { differenceInYears, subYears, isValid } from "date-fns"; // Importações necessárias
import { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
import {
  Container,
  DateField,
  ColumnDate,
  DateUnique,
  StyledDatePicker,
} from "./DatePickerField.js";
import "./DatePickerField.css";

registerLocale("pt-BR", ptBR);

const DatePickerField = ({ value, onChange, label }) => {
  const currentDate = new Date();
  const minDateFor18YearsOld = subYears(currentDate, 18); // Data mínima para 18 anos
  const datePickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(
    value && isValid(new Date(value)) ? new Date(value) : minDateFor18YearsOld // Se a data for válida, usa; caso contrário, usa a data de 18 anos atrás.
  );

  // Função de atualização de data
  const handleDateChange = (date) => {
    if (isValid(date)) {
      setSelectedDate(date);
      onChange(date); // Envia a data para o componente pai
      datePickerRef.current.setOpen(false); // Fecha o calendário após a seleção
    }
  };

  // Função para abrir o calendário manualmente
  const handleDateFieldClick = () => {
    datePickerRef.current.setOpen(true);
  };

  // Calcula a idade
  const age = differenceInYears(currentDate, selectedDate);
  const dateFieldColor = age < 18 ? "var(--primary)" : "var(--tertiary)"; // Cor do campo dependendo da idade
  const minDate = subYears(currentDate, 110); // Data mínima para 110 anos atrás
  const maxDate = subYears(currentDate, 18); // Data máxima para 18 anos atrás

  return (
    <Container>
      <label>{label}</label>
      <DateField onClick={handleDateFieldClick} style={{ color: dateFieldColor }}>
        <ColumnDate>
          <DateUnique>Mês</DateUnique>
          <DateUnique>Dia</DateUnique>
          <DateUnique>Ano</DateUnique>
        </ColumnDate>
        {selectedDate ? (
          <ColumnDate>
            <DateUnique>
              {selectedDate.toLocaleDateString("pt-BR", { month: "short" })}
            </DateUnique>
            <DateUnique>{selectedDate.getDate()}</DateUnique>
            <DateUnique>{selectedDate.getFullYear()}</DateUnique>
          </ColumnDate>
        ) : (
          "Selecione a Data"
        )}
      </DateField>
      <StyledDatePicker
        ref={datePickerRef}
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        locale="pt-BR"
        customInput={<div />}
        withPortal
        minDate={minDate} // Limita a data mínima
        maxDate={maxDate} // Limita a data máxima para 18 anos atrás
      />
    </Container>
  );
};

export default DatePickerField;
