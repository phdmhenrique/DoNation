import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/pt-br";
import { ptBR } from "@mui/x-date-pickers/locales";
import {
  Container,
  DateField,
  DateText,
  DateLabels,
  StyledInput,
} from "./DatePickerField.ts";

dayjs.extend(updateLocale);

interface DatePickerFieldProps {
  value: string;
  onChange: (date: string | null, isValidDate: boolean) => void;
  label?: string;
  isValidDate: boolean;
}

const DatePickerField = ({ value, onChange, label, isValidDate }: DatePickerFieldProps) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    value && dayjs(value).isValid() ? dayjs(value) : null
  );
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [localIsValidDate, setLocalIsValidDate] = useState(isValidDate);

  const minDate = dayjs().subtract(18, "years");
  const today = dayjs();

  const handleDateChange = (date: Dayjs | null) => {
    if (date && date.isValid()) {
      const isOfAge = date.isBefore(minDate); // Verifica se a data é válida para maior de 18 anos
      setSelectedDate(date);
      setLocalIsValidDate(isOfAge); // Atualiza a validade local da data
      onChange(date.format("YYYY-MM-DD"), isOfAge); // Passa a data e a validade para o componente pai
    } else {
      setLocalIsValidDate(false);
      setSelectedDate(null);
      onChange(null, false); // Passa null e a validade falsa
    }
  };

  const handleOpenDatePicker = () => {
    setOpenDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    setOpenDatePicker(false);
  };

  const shouldDisableDate = (date: Dayjs): boolean => {
    return date.isAfter(today) || date.isAfter(minDate); // Desabilita datas no futuro ou menores de 18 anos
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
        <DateText isValidDate={localIsValidDate}>
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
        }}
      >
        <StyledInput>
          <MobileDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            open={openDatePicker}
            onClose={handleCloseDatePicker}
            maxDate={minDate}
            shouldDisableDate={shouldDisableDate}
          />
        </StyledInput>
      </LocalizationProvider>
    </Container>
  );
};

export default DatePickerField;
