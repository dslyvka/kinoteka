import Pagination from 'tui-pagination';

const ITEMS_PER_PAGE_HOME = 20;

export function createPagination() {
  const options = {
    itemsPerPage: ITEMS_PER_PAGE_HOME,
    visiblePages: 5,
    page: 1,
    totalItems: 1000,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    usageStatistics: false,
  };
  const container = document.getElementById('tui-pagination-container');
  window.pagination = new Pagination(container, options);
}
