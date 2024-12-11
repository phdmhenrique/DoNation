import PropTypes from "prop-types";
import styled from "styled-components";

export const Container = styled.div`
  font-size: var(--font__16);
  color: var(--gray-3);
  font-weight: 500;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  & div {
    display: flex;
    gap: 1.5rem;
  }

  & .filters {
    & span {
      color: var(--gray-3);
      font-size: var(--font__16);
      font-weight: 700;
      cursor: pointer;

      &.active {
        color: var(--primary);
      }
    }
  }
`;

const ResultsAndFilters = ({
  resultsCount,
  filters,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <Container>
      <div>
        Exibindo {resultsCount} de {resultsCount} resultados
      </div>
      {filters && (
        <div className="filters">
          {filters.map((filter) => (
            <span
              key={filter.key}
              className={filter.key === activeFilter ? "active" : ""}
              onClick={() => onFilterChange(filter.key)}
            >
              {filter.label}
            </span>
          ))}
        </div>
      )}
    </Container>
  );
};

ResultsAndFilters.propTypes = {
  resultsCount: PropTypes.number,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  activeFilter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

ResultsAndFilters.defaultProps = {
  filters: null,
  activeFilter: null,
  onFilterChange: () => {},
};

export default ResultsAndFilters;
