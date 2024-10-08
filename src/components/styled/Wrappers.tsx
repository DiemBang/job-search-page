import styled from "styled-components";

export const SearchPageWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const SearchResultWrapper = styled.div`
  margin-bottom: 1em;
  padding: 1em;
  background-color: #f66037;
  color: white;
  box-shadow: 1px -2px 4px black;
  position: relative;
  `;

export const FavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; 
  position: absolute; 
  top: 10px; 
  right: 10px; 
  z-index: 10; 
  cursor: pointer;
`;
