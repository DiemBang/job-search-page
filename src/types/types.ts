import React from 'react';

export interface IInformationField {
  label: string;
  value: string | null | undefined;
  element: React.ElementType;
}
