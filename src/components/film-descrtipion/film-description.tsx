import { FC, memo, useEffect, useMemo, useState } from 'react';
import { Tabs } from './tabs';
import { Overview } from './tab-panels/overview';
import { Details as FilmDetails } from './tab-panels/details';
import { Reviews as FilmReviews } from './tab-panels/reviews';
import { Film } from '../../types/film';

interface FilmDescriptionProps {
  film: Film;
}

const enum TabsDTO {
  OVERVIEW = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

const FilmDescriptionComponent: FC<FilmDescriptionProps> = ({ film }) => {
  const [activeTab, setActiveTab] = useState(TabsDTO.OVERVIEW);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab as TabsDTO);
  };

  const panel = useMemo(() => {
    switch (activeTab) {
      case TabsDTO.OVERVIEW:
        return <Overview film={film} />;
      case TabsDTO.Details:
        return <FilmDetails film={film} />;
      case TabsDTO.Reviews:
        return <FilmReviews />;
      default:
        return null;
    }
  }, [activeTab, film]);

  useEffect(() => {
    setActiveTab(TabsDTO.OVERVIEW);
  }, [film.id]);

  return (
    <div className="film-card__desc">
      <Tabs onClick={handleTabClick} active={activeTab} />

      {panel}
    </div>
  );
};

export const FilmDescription = memo(FilmDescriptionComponent);
