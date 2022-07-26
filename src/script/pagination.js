import Pagination from 'tui-pagination';
const options = {
  totalItems: '',
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
};
export let paginationTui = new Pagination('pagination', options);
export function paginationStart(data) {
  if (data.total_results > 10000) {
    data.total_results = 10000;
  }
  options.totalItems = data.total_results;
  paginationTui = new Pagination('pagination', options);
  return paginationTui;
}
