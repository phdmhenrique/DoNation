import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  Container,
  DateField,
  DateText,
  DateLabels,
  StyledInput,
} from "./DatePickerField.js";

const DatePickerField = ({ value, onChange, label, isValidDate }) => {
  const [selectedDate, setSelectedDate] = useState(
    value && dayjs(value).isValid() ? dayjs(value) : null
  );
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [localIsValidDate, setLocalIsValidDate] = useState(isValidDate);

  const minDate = dayjs().subtract(18, "years");
  const today = dayjs();

  // Function to handle date changes
  const handleDateChange = (date) => {
    if (date && date.isValid()) {
      const isOfAge = date.isBefore(dayjs().subtract(18, "years"));
      setSelectedDate(date);
      setLocalIsValidDate(isOfAge); // Updates the local isValidDate state
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
          <span>Day</span>
          <span>Month</span>
          <span>Year</span>
        </DateLabels>
        <DateText isValidDate={isValidDate}>
          <span>{selectedDate ? selectedDate.format("DD") : "--"}</span>
          <span>{selectedDate ? selectedDate.format("MM") : "--"}</span>
          <span>{selectedDate ? selectedDate.format("YYYY") : "--"}</span>
        </DateText>
      </DateField>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StyledInput>
          <MobileDatePicker
            value={selectedDate}
            onChange={handleDateChange}
            open={openDatePicker}
            onClose={handleCloseDatePicker}
            renderInput={() => null}
            maxDate={minDate} // Sets the minimum date
            shouldDisableDate={shouldDisableDate}
          />
        </StyledInput>
      </LocalizationProvider>
    </Container>
  );
};

export default DatePickerField;
