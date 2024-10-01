import { createContext, ReactNode, useEffect, useRef } from 'react';
import { useState } from 'react';

const ModalsContext = createContext<IModalsContextValues | null>(null);

interface IModalsContextProviderProps {
  children: ReactNode;
}

interface IModalsContextValues {
  isDropDownsOpen: IisDropDownsOpen;
  occupationRef: React.RefObject<HTMLDivElement>;
  locationRef: React.RefObject<HTMLDivElement>;
  toggleDropDown: (key: keyof IisDropDownsOpen) => void;
  closeAllDropDowns: () => void;
}

interface IisDropDownsOpen {
  occupationOpen: boolean;
  locationOpen: boolean;
  overlay: boolean;
}

export const ModalsContextProvider = ({
  children,
}: IModalsContextProviderProps) => {
  const [isDropDownsOpen, setIsDropDownsOpen] = useState({
    occupationOpen: false,
    locationOpen: false,
    overlay: false,
  });

  const occupationRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDropDownsOpen.occupationOpen || isDropDownsOpen.occupationOpen) {
      setIsDropDownsOpen((prev) => ({ ...prev, overlay: true }));
    } else {
      setIsDropDownsOpen((prev) => ({ ...prev, overlay: false }));
    }
  }, [isDropDownsOpen.locationOpen, isDropDownsOpen.occupationOpen]);

  /**
   * This useEffect makes sure that when we click outside of our dropdown it should close
   * we are using refs for the location and occupation which are passed down to their elements
   */
  useEffect(() => {
    const handleClickOutsideOfDropdown = (e: MouseEvent) => {
      const dropDownRefs = [
        { ref: occupationRef, key: 'occupationOpen' },
        { ref: locationRef, key: 'locationOpen' },
      ];
      dropDownRefs.forEach(({ ref, key }) => {
        if (
          ref.current &&
          !ref.current.contains(e.target as Node) &&
          isDropDownsOpen[key as keyof IisDropDownsOpen]
        ) {
          setIsDropDownsOpen((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutsideOfDropdown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOfDropdown);
    };
  }, [isDropDownsOpen]);

  const toggleDropDown = (key: keyof IisDropDownsOpen) => {
    setIsDropDownsOpen((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  };

  const closeAllDropDowns = () => {
    setIsDropDownsOpen({
      occupationOpen: false,
      locationOpen: false,
      overlay: false,
    });
  };

  const modalsInfoValues: IModalsContextValues = {
    isDropDownsOpen,
    occupationRef,
    locationRef,
    toggleDropDown,
    closeAllDropDowns,
  };

  return (
    <ModalsContext.Provider value={modalsInfoValues}>
      {children}
    </ModalsContext.Provider>
  );
};

export default ModalsContext;
