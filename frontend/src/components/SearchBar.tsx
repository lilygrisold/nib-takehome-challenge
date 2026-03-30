import { useState, FormEvent, KeyboardEvent } from 'react';
import { Search, Sparkles } from 'lucide-react';
import styled from 'styled-components';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSurpriseMe: () => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, onSurpriseMe, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <InputWrapper>
          <SearchInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for recipes (e.g., beef, chicken, pudding...)"
            disabled={isLoading}
            aria-label="Search recipes"
          />
          <SubmitButton 
            type="submit" 
            disabled={isLoading || !query.trim()}
          >
            <Search style={{ height: '1.25rem', width: '1.25rem' }} />
            <span>Search</span>
          </SubmitButton>
        </InputWrapper>
        
        <ButtonWrapper>
          <SurpriseButton 
            type="button"
            onClick={onSurpriseMe}
            disabled={isLoading}
          >
            <Sparkles style={{ height: '1.25rem', width: '1.25rem' }} />
            <span>Surprise Me!</span>
          </SurpriseButton>
        </ButtonWrapper>
      </SearchForm>
    </SearchContainer>
  );
};

// All the styled-components down here
const SearchContainer = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 1.25rem;
  padding-right: 8rem;
  font-size: 1.125rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  transition: border-color 150ms ease;
  
  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
  
  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 1.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 150ms ease;
  
  &:hover:not(:disabled) {
    background-color: #1d4ed8;
  }
  
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SurpriseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(to right, #a855f7, #ec4899);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 150ms ease;
  
  &:hover:not(:disabled) {
    background: linear-gradient(to right, #9333ea, #db2777);
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default SearchBar;