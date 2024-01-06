import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Film } from '../../types/film';
import { TTabs, TabTypes } from '../../types/tabs';
import { Tabs } from './tabs';
import { DetailsTab as FilmDetails } from './tabs/tab-panels/details-tab.tsx';
import { OverviewTab } from './tabs/tab-panels/overview-tab.tsx';
import { ReviewsTab as FilmReviews } from './tabs/tab-panels/reviews-tab.tsx';

interface FilmTabsProps {
  film: Film;
}

const FilmTabsComponent: FC<FilmTabsProps> = ({ film }) => {
  const [activeTab, setActiveTab] = useState<TTabs>(TabTypes.Overview);

  const handleTabClick = useCallback((tab: TTabs) => {
    setActiveTab(tab);
  }, []);

  const panel = useMemo(() => {
    switch (activeTab) {
      case TabTypes.Overview:
        return <OverviewTab film={film} />;
      case TabTypes.Details:
        return <FilmDetails film={film} />;
      case TabTypes.Reviews:
        return <FilmReviews />;
      default:
        return null;
    }
  }, [activeTab, film]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setActiveTab(TabTypes.Overview);
    }

    return () => {
      isMounted = false;
    };
  }, [film.id]);

  return (
    <div className="film-card__desc">
      <Tabs onClick={handleTabClick} activeTab={activeTab} />

      {panel}
    </div>
  );
};

export const FilmTabs = memo(FilmTabsComponent);
