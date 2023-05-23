import { useMediaQuery } from 'react-responsive';

export function Mobile({ children }) {
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });
  return <>{isMobile && children}</>;
}

export function TabletAbove({ children }) {
  const isTabletabove = useMediaQuery({
    query: '(min-width:768px)',
  });
  return <>{isTabletabove && children}</>;
}
