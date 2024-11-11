import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/pt-br";
import { ptBR } from "@mui/x-date-pickers/locales";
import {
  Container,
  DateField,
  DateText,
  DateLabels,
  StyledInput,
} from "./DatePickerField.js";

dayjs.extend(updateLocale);

const DatePickerField = ({ value, onChange, label, isValidDate }) => {
  const [selectedDate, setSelectedDate] = useState(
    value && dayjs(value).isValid() ? dayjs(value) : null
  );
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [localIsValidDate, setLocalIsValidDate] = useState(isValidDate);

  const minDate = dayjs().subtract(18, "years");
  const today = dayjs();

  // Função para lidar com a mudança de data
  const handleDateChange = (date) => {
    if (date && date.isValid()) {
      const isOfAge = date.isBefore(dayjs().subtract(18, "years"));
      setSelectedDate(date);
      setLocalIsValidDate(isOfAge);  // Atualiza o estado local de isValidDate
      onChange(date.format("YYYY-MM-DD"), isOfAge);
    } else {
      setLocalIsValidDate(false);
      setSelectedDate(null);
      onChange(null, false);
    }
  };
  

  const handleOpenDatePicker = () => {
    setOpenDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    setOpenDatePicker(false);
  };

  const shouldDisableDate = (date) => {
    return date.isAfter(today) || date.isAfter(minDate);
  };

  return (
    <Container>
      <label>{label}</label>
      <DateField onClick={handleOpenDatePicker}>
        <DateLabels>
          <span>DIA</span>
          <span>MÊS</span>
          <span>ANO</span>
        </DateLabels>
        <DateText isValidDate={isValidDate}>
          <span>{selectedDate ? selectedDate.format("DD") : "--"}</span>
          <span>{selectedDate ? selectedDate.format("MM") : "--"}</span>
          <span>{selectedDate ? selectedDate.format("YYYY") : "--"}</span>
        </DateText>
      </DateField>

      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="pt-br"
        localeText={{
          ...ptBR.components.MuiLocalizationProvider.defaultProps.localeText,
          cancelButtonLabel: "Cancelar",
          okButtonLabel: "Confirmar",
          toolbarTitle: "Selecione a data",
        }}
      >
        <StyledInput>
          <MobileDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            open={openDatePicker}
            onClose={handleCloseDatePicker}
            renderInput={() => null}
            maxDate={minDate}  // Limita a data mínima
            shouldDisableDate={shouldDisableDate}
          />
        </StyledInput>
      </LocalizationProvider>
    </Container>
  );
};

export default DatePickerField;
