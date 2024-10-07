import {
  FormInputSearchVariation,
  FormInputType,
} from '@digi/arbetsformedlingen';
import { DigiFormInputSearch } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../hooks/useAdvertsContext';
import { useEffect, useRef, useState } from 'react';
import { getComplete } from '../../services/serviceBase';
import { debounce } from 'lodash';
import { PositionContainer } from '../../components/styled/shared/PositionContainer';
import { getFirstLetterWithUppercase } from '../../utils/numberStringUtils';

const initialSuggestions = [
  'Lärare',
  'Läkare stockholms Län',
  'Byggbranschen engelska',
  'Ingenjör körkort',
  'Städare västra götaland',
];

export const SearchField = () => {
  const { handleClickOnSearch } = useAdvertsContext();

  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const suggestionRef = useRef<HTMLDivElement | null>(null);

  /**
   * fetches suggestions from a service using the complete api
   * debouncing to load the data correctly when user is typing without poor performance
   */
  const debounceSuggestions = debounce(async (value: string) => {
    try {
      if (value.trim().length > 0) {
        const suggestions = await getComplete(value);

        console.log('Fetched suggestions:', suggestions);
        setSuggestions(suggestions || []);
      } else {
        setSuggestions(initialSuggestions);
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setSuggestions([]); // Set an empty array if an error occurs
    }
  }, 300);
  const handleSearchInputOnChange = async (value: string) => {
    setSearchValue(value);
    debounceSuggestions(value);
  };

  /**
   * updates search input value on click
   * have delay before closing suggestion dropdown so the click event can fire before
   * @param {string} suggestion
   */
  const handleSuggestionOnClick = (suggestion: string) => {
    setSearchValue(suggestion);
    setTimeout(() => {
      setSuggestionsOpen(false);
    }, 100);
  };

  const handleClickOnSearchButton = (searchInput: string) => {
    handleClickOnSearch(searchInput);
    setSearchValue('');
    setSuggestionsOpen(false);
  };

  /* 
  Tried onAfBlur on DigiFomrInputSearch could not make it work
  instead using eventlistener to close suggestion dropdown when clicking outside of it
  */
  useEffect(() => {
    const closeSuggestionDropdown = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(target) &&
        !target?.closest('.digi-form-input__input-wrapper')
      ) {
        setSuggestionsOpen(false);
      }
    };

    document.addEventListener('mousedown', closeSuggestionDropdown);

    return () => {
      document.removeEventListener('mousedown', closeSuggestionDropdown);
    };
  }, [suggestionsOpen]);

  return (
    <PositionContainer $position="relative" $zIndex={11}>
      <DigiFormInputSearch
        afLabel="Sök på ett eller flera ord"
        afVariation={FormInputSearchVariation.MEDIUM}
        afType={FormInputType.SEARCH}
        afButtonText="Sök"
        onAfOnInput={(e) => handleSearchInputOnChange(e.target.value)}
        onAfOnClick={() => handleClickOnSearchButton(searchValue)}
        onAfOnFocus={() => setSuggestionsOpen(true)}
        afValue={searchValue}
      ></DigiFormInputSearch>
      {suggestionsOpen && suggestions.length > 0 && (
        <PositionContainer
          ref={suggestionRef}
          $position="absolute"
          className="suggestion-dropdown"
        >
          {suggestions.map((suggestion, index) => {
            return (
              <div
                className="suggestion"
                onClick={() => handleSuggestionOnClick(suggestion)}
                key={`${suggestion}-${index}`}
              >
                {getFirstLetterWithUppercase(suggestion)}
              </div>
            );
          })}
        </PositionContainer>
      )}
    </PositionContainer>
  );
};
