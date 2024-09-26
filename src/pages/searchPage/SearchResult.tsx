interface IAdProps {
    id: number;
    headline: string;
    employer: string;
    publication_date: string;
  }

export const SearchResult = (props:IAdProps) => {
    return (
        <>
        <p>{props.headline}</p>
        </>
    );
}