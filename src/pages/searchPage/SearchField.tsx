import {
  FormInputSearchVariation,
  FormInputType,
} from '@digi/arbetsformedlingen';
import {
  DigiFormInputSearch,
  DigiTypography,
} from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../hooks/useAdvertsContext';
import { useEffect, useRef, useState } from 'react';
import { getComplete } from '../../services/serviceBase';
import { debounce } from 'lodash';
import { PositionContainer } from '../../components/styled/shared/PositionContainer';

const initialSuggestions = [
  'lärare',
  'läkare',
  'advokat',
  'ingenjör',
  'städare',
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
    if (value.trim().length > 0) {
      const suggestions = await getComplete(value);
      console.log(suggestions);
      setSuggestions(suggestions);
    } else {
      setSuggestions(initialSuggestions);
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
    }, 50);
  };

  const closeSuggestionDropdown = (event: any) => {
    if (
      suggestionRef.current &&
      !suggestionRef.current.contains(event.target) &&
      !event.target.closest('.digi-form-input__input-wrapper')
    ) {
      setSuggestionsOpen(false);
    }
  };

  /* 
  Tried onAfBlur on DigiFomrInputSearch could not make it work
  instead using eventlistener to close suggestion dropdown when clicking outside of it
  */

  useEffect(() => {
    document.addEventListener('mousedown', closeSuggestionDropdown);
    return () => {
      document.removeEventListener('mousedown', closeSuggestionDropdown);
    };
  }, []);

  return (
    <PositionContainer $position="relative" $zIndex={11}>
      <DigiFormInputSearch
        afLabel="Sök på ett eller flera ord"
        afVariation={FormInputSearchVariation.MEDIUM}
        afType={FormInputType.SEARCH}
        afButtonText="Sök"
        onAfOnInput={(e) => handleSearchInputOnChange(e.target.value)}
        onAfOnClick={() => handleClickOnSearch(searchValue)}
        onAfOnFocus={() => setSuggestionsOpen(true)}
        afValue={searchValue}
      ></DigiFormInputSearch>
      {suggestionsOpen && (
        <PositionContainer
          ref={suggestionRef}
          $position="absolute"
          className="suggestion-dropdown"
        >
          <DigiTypography>
            {suggestions.map((suggestion, index) => {
              return (
                <div
                  className="suggestion"
                  onClick={() => handleSuggestionOnClick(suggestion)}
                  key={index}
                >
                  {suggestion}
                </div>
              );
            })}
          </DigiTypography>
        </PositionContainer>
      )}
    </PositionContainer>
  );
};
