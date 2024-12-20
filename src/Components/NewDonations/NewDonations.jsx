import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiDonations, getUserImageUrl } from "../../api/axiosConfig";
import { useAuth } from "../../Contexts/AuthContext";

// Icons
import { PiInfinity } from "react-icons/pi";
import MyContributionIcon from "../../Icons/MyContributionIcon.jsx";

// Styles
import {
  Container,
  PreviewSection,
  DonationCard,
  UserInfo,
  UserImage,
  UserName,
  PostDate,
  DonationTitle,
  DonationImage,
  Tag,
  FormSection,
  FormGrid,
  FormColumn,
  FormGroup,
  TimeSelector,
  DaySelector,
  TimeGrid,
  TimeSlot,
  TagSelector,
  StyledForm,
  StyledInput,
  StyledTextArea,
  StyledSelect,
  StyledButton,
  ImageUploadOverlay,
  Modal,
  ModalContent,
  ModalActions,
} from "./NewDonations";

// Components
import { InterestsAndDetailsStyled } from "../CardDonationItem/CardDonationItem.js";
import {
  ButtonStyledInterests,
  Details,
  Interests,
} from "../CardContributions/CardContributions.js";

const AVAILABLE_TAGS = [
  "Doação", "Caridade", "Solidariedade", "Beneficência", "Contribuição",
  "Ajuda", "Generosidade", "Auxílio", "Alimentos", "Filantropia",
  "Voluntariado", "Social", "Humanitário", "Livros", "Tecnologia",
  "Ambiental", "Escolar", "Brinquedos", "Construção", "Cultural",
  "Instrumento", "Participação", "Recursos", "Comunidade", "Altruísmo",
  "Acolhimento", "Empatia", "Colaboração"
];

const DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
const DAY_MAP = {
  Seg: "MONDAY",
  Ter: "TUESDAY",
  Qua: "WEDNESDAY",
  Qui: "THURSDAY",
  Sex: "FRIDAY",
  Sab: "SATURDAY",
  Dom: "SUNDAY",
};

export default function NewDonation() {
  const { groupName } = useParams();
  const { user } = useAuth();
  const userImageUrl = getUserImageUrl(user.userImage);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    tags: [],
    avaliableDate: DAYS.map((day) => ({
      day,
      avaliableTime: [],
    })),
    donationImage: null,
    availability: "SERVICES",
    quantity: 0,
  });

  const [selectedDay, setSelectedDay] = useState("Seg");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("");
  const [editingStartTime, setEditingStartTime] = useState("");
  const [editingEndTime, setEditingEndTime] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const now = new Date();
    const options = { month: "long", day: "numeric" };
    setCurrentDate(now.toLocaleDateString("pt-BR", options));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "name"
          ? value.slice(0, 50)
          : name === "description"
          ? value.slice(0, 250)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        donationImage: {
          file,
          preview: URL.createObjectURL(file),
        },
      }));
    }
  };

  const toggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const addTimeSlot = (e) => {
    e.preventDefault();
    if (startTime && endTime && startTime < endTime) {
      const newTimeRange = `${startTime} ${endTime}`;
      setFormData((prev) => ({
        ...prev,
        avaliableDate: prev.avaliableDate.map((date) =>
          date.day === selectedDay
            ? {
                ...date,
                avaliableTime: [...date.avaliableTime, newTimeRange].sort(),
              }
            : date
        ),
      }));
      setStartTime("");
      setEndTime("");
    } else {
      setError("Por favor, insira um intervalo de tempo válido.");
    }
  };

  const handleTimeRangeClick = (timeRange) => {
    setSelectedTimeRange(timeRange);
    const [start, end] = timeRange.split("  ");
    setEditingStartTime(start);
    setEditingEndTime(end);
    setModalOpen(true);
  };

  const handleTimeRangeEdit = () => {
    if (editingStartTime && editingEndTime && editingStartTime < editingEndTime) {
      const newTimeRange = `${editingStartTime} - ${editingEndTime}`;
      setFormData((prev) => ({
        ...prev,
        avaliableDate: prev.avaliableDate.map((date) =>
          date.day === selectedDay
            ? {
                ...date,
                avaliableTime: date.avaliableTime.map((t) =>
                  t === selectedTimeRange ? newTimeRange : t
                ).sort(),
              }
            : date
        ),
      }));
      setModalOpen(false);
    } else {
      setError("Por favor, insira um intervalo de tempo válido.");
    }
  };

  const handleTimeRangeRemove = () => {
    setFormData((prev) => ({
      ...prev,
      avaliableDate: prev.avaliableDate.map((date) =>
        date.day === selectedDay
          ? {
              ...date,
              avaliableTime: date.avaliableTime.filter(
                (t) => t !== selectedTimeRange
              ),
            }
          : date
      ),
    }));
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!formData.donationImage) {
      setError("Por favor, selecione uma imagem para a doação.");
      setIsSubmitting(false);
      return;
    }

    const avaliableDateTranslated = formData.avaliableDate.map((date) => ({
      ...date,
      day: DAY_MAP[date.day],
    }));

    const formDataToSend = new FormData();
    const createDonationRequest = {
      name: formData.name,
      description: formData.description,
      address: formData.address,
      tags: formData.tags,
      avaliableDate: avaliableDateTranslated.filter(
        (date) => date.avaliableTime.length > 0
      ),
      availability:
        formData.availability === "SERVICES" ? "INF" : formData.quantity,
    };

    formDataToSend.append(
      "createDonationRequest",
      new Blob([JSON.stringify(createDonationRequest)], {
        type: "application/json",
      })
    );
    formDataToSend.append("imageFile", formData.donationImage.file);

    try {
      await apiDonations.createNewDonation(groupName, formDataToSend);
      // Adicione aqui a lógica para redirecionar ou mostrar uma mensagem de sucesso
    } catch (error) {
      console.error("Erro ao criar doação:", error);
      setError(
        "Ocorreu um erro ao criar a doação. Por favor, tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <PreviewSection>
        <DonationCard>
          <UserInfo>
            <div className="user__image-info">
              <UserImage>
                <img src={userImageUrl} alt="User" />
              </UserImage>
              <UserName>
                <h3>{user.name}</h3>
                <span>{user.username}</span>
              </UserName>
            </div>
            <PostDate>{currentDate}</PostDate>
          </UserInfo>

          <DonationTitle>{formData.name || "Título da Doação"}</DonationTitle>

          <DonationImage
            onClick={() => document.getElementById("imageInput").click()}
          >
            {formData.donationImage ? (
              <img src={formData.donationImage.preview} alt={formData.name} />
            ) : (
              <ImageUploadOverlay>
                <span>Clique para adicionar uma imagem</span>
              </ImageUploadOverlay>
            )}

            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </DonationImage>

          <InterestsAndDetailsStyled>
            <Interests>
              {formData.tags.map((tag, index) => (
                <ButtonStyledInterests key={index} className="inactive">
                  #{tag}
                </ButtonStyledInterests>
              ))}
            </Interests>

            <Details>
              <div>
                <span>Disponibilidade</span>
                {formData.availability === "SERVICES" ? (
                  <p>
                    <PiInfinity />
                  </p>
                ) : (
                  <p>{formData.quantity}</p>
                )}
              </div>
              <button>
                Solicitar
                <MyContributionIcon />
              </button>
            </Details>
          </InterestsAndDetailsStyled>
        </DonationCard>
      </PreviewSection>

      <FormSection>
        <StyledForm onSubmit={handleSubmit}>
          {error && (
            <div style={{ color: "var(--quinary)", marginBottom: "1rem" }}>
              {error}
            </div>
          )}
          <FormGrid>
            <FormColumn>
              <FormGroup>
                <label>Nome da Doação *</label>
                <StyledInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Descrição *</label>
                <StyledTextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Endereço *</label>
                <StyledInput
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label>Disponibilidade *</label>
                <StyledSelect
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                >
                  <option value="SERVICES">Serviços</option>
                  <option value="GOODS">Bens</option>
                </StyledSelect>
              </FormGroup>

              {formData.availability === "GOODS" && (
                <FormGroup>
                  <label>Quantidade disponível *</label>
                  <StyledInput
                    type="number"
                    name="quantity"
                    value={formData.quantity || "0"}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              )}
            </FormColumn>

            <FormColumn>
              <FormGroup>
                <label>Tags Disponíveis *</label>
                <TagSelector>
                  {AVAILABLE_TAGS.map((tag) => (
                    <Tag
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      selected={formData.tags.includes(tag)}
                    >
                      #{tag}
                    </Tag>
                  ))}
                </TagSelector>
              </FormGroup>

              <FormGroup>
                <label>Horários Disponíveis *</label>
                <TimeSelector>
                  <DaySelector>
                    {DAYS.map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={selectedDay === day ? "active" : ""}
                        onClick={() => setSelectedDay(day)}
                      >
                        {day}
                      </button>
                    ))}
                  </DaySelector>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    <StyledInput
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                    <StyledInput
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                    <StyledButton type="button" onClick={addTimeSlot}>
                      Adicionar
                    </StyledButton>
                  </div>

                  <TimeGrid>
                    {formData.avaliableDate
                      .find((d) => d.day === selectedDay)
                      ?.avaliableTime.map((timeRange, index) => (
                        <TimeSlot
                          key={index}
                          onClick={() => handleTimeRangeClick(timeRange)}
                        >
                          {timeRange}
                        </TimeSlot>
                      ))}
                  </TimeGrid>
                </TimeSelector>
              </FormGroup>
            </FormColumn>
          </FormGrid>

          <StyledButton
            type="submit"
            disabled={isSubmitting}
            style={{ marginTop: "2rem" }}
          >
            {isSubmitting ? "Criando Doação..." : "Criar Doação"}
          </StyledButton>
        </StyledForm>
      </FormSection>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent>
          <h3>Detalhe do Horário</h3>
          <StyledInput
            type="time"
            value={editingStartTime}
            onChange={(e) => setEditingStartTime(e.target.value)}
          />
          <StyledInput
            type="time"
            value={editingEndTime}
            onChange={(e) => setEditingEndTime(e.target.value)}
          />

          <ModalActions>
            <StyledButton onClick={handleTimeRangeEdit}>Salvar</StyledButton>
            <StyledButton onClick={handleTimeRangeRemove}>Remover</StyledButton>
            <StyledButton onClick={() => setModalOpen(false)}>
              Cancelar
            </StyledButton>
          </ModalActions>
        </ModalContent>
      </Modal>
    </Container>
  );
}

