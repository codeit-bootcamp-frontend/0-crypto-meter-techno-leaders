import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';

function CustomPagination() {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#00A661',
      },
    },
  });
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <ThemeProvider theme={customTheme}>
      <Pagination
        style={{ margin: '3rem auto 0' }}
        color="primary"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        renderItem={(props2) => (
          <PaginationItem
            {...props2}
            disableRipple
            style={{
              fontSize: '1.4rem',
              fontFamily: 'Pretendard',
              fontWeight: 500,
            }}
          />
        )}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    </ThemeProvider>
  );
}

export default CustomPagination;
