import { DigiFormFilter } from '@digi/arbetsformedlingen-react';
import useAdvertsContext from '../../../hooks/useAdvertsContext';
import { useState, useEffect } from 'react';

export const PublishedFilter = () => {
  const { changePublishedDate } = useAdvertsContext();
  const [checkedList, setCheckedList] = useState<string[]>([]);

  function daysAgo(isoDateString: string): number {
    // Parse the ISO date string
    const date: Date = new Date(isoDateString);

    // Get the current date
    const today: Date = new Date();

    // Calculate the difference in milliseconds
    const diffInMilliseconds: number = today.getTime() - date.getTime();

    // Convert the difference from milliseconds to days
    const diffInDays: number = Math.floor(
      diffInMilliseconds / (1000 * 60 * 60 * 24)
    );

    return diffInDays;
  }

  useEffect(() => {
    // check URL to see if needs to add to checkedList
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);

    const publishedParams = urlParams.get('published-after');

    if (publishedParams === null) {
      return;
    }
    const daysAgoInParams = daysAgo(publishedParams);

    if (daysAgoInParams === 0) {
      setCheckedList(['idag']);
    } else if (daysAgoInParams === 7) {
      setCheckedList(['7dagar']);
    } else if (daysAgoInParams === 30) {
      setCheckedList(['30dagar']);
    }
  }, []);

  return (
    <>
      <DigiFormFilter
        afFilterButtonText="Publicerad"
        afSubmitButtonText="Filtrera"
        afListItems={[
          { id: 'alla', label: 'Alla' },
          { id: 'idag', label: 'Idag' },
          { id: '7dagar', label: 'Senaste 7 dagarna' },
          { id: '30dagar', label: 'Senaste 30 dagarna' },
        ]}
        onAfChangeFilter={(e) => console.log(e.detail.id, e.detail.isChecked)}
        afCheckItems={checkedList}
        onAfResetFilter={() => {
          changePublishedDate([]);
        }}
        onAfSubmitFilter={(e) => changePublishedDate(e.detail.checked)}
        onAfCloseFilter={(e) => changePublishedDate(e.detail.checked)}
      ></DigiFormFilter>
    </>
  );
};
