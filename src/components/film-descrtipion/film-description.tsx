import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Tabs } from './tabs';
import { Overview } from './tab-panels/overview';
import { Details as FilmDetails } from './tab-panels/details';
import { Reviews as FilmReviews } from './tab-panels/reviews';
import { Film } from '../../types/film';
import { TabTypes } from '../../types/tabs';

interface FilmDescriptionProps {
  film: Film;
}

const FilmDescriptionComponent: FC<FilmDescriptionProps> = ({ film }) => {
  const [activeTab, setActiveTab] = useState<string>(TabTypes[0]);

  const handleTabClick = useCallback((tab: string) => {
    const foundTab = TabTypes.find((currentTab) => tab === currentTab);
    if (foundTab) {
      setActiveTab(tab);
    }
  }, []);

  const panel = useMemo(() => {
    switch (activeTab) {
      case TabTypes[0]:
        return <Overview film={film} />;
      case TabTypes[1]:
        return <FilmDetails film={film} />;
      case TabTypes[2]:
        return <FilmReviews />;
      default:
        return null;
    }
  }, [activeTab, film]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setActiveTab(TabTypes[0]);
    }

    return () => {
      isMounted = false;
    };
  }, [film.id]);

  return (
    <div className="film-card__desc">
      <Tabs onClick={handleTabClick} active={activeTab} />

      {panel}
    </div>
  );
};

export const FilmDescription = memo(FilmDescriptionComponent);
