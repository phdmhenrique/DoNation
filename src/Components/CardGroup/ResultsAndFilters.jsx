import PropTypes from "prop-types";
import { useEffect } from "react";
import styled from "styled-components";

export const Container = styled.div`
  font-size: var(--font__16);
  color: var(--gray-3);
  font-weight: 500;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: ${(props) => props.padding || "0"};

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
  filters,
  activeFilter,
  onFilterChange,
  children,
  padding
}) => {

  useEffect(() => {
    if (filters && filters.length > 0 && !activeFilter) {
      const savedFilter = localStorage.getItem("selectedFilterToMyGroups") || filters[0].key;
      onFilterChange(savedFilter);
    }
  }, [filters, activeFilter, onFilterChange]);
  
  return (
    <Container padding={padding}>
      <div>
        {children}
      </div>
      {filters && (
        <div className="filters">
          {filters.map((filter) => (
            <span
              key={filter.key}
              className={activeFilter === filter.key ? "active" : ""}
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
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  activeFilter: PropTypes.string,
  onFilterChange: PropTypes.func,
  children: PropTypes.node,
  padding: PropTypes.string,
};

ResultsAndFilters.defaultProps = {
  filters: null,
  onFilterChange: () => {},
};

export default ResultsAndFilters;
