$(async function () {
  async function fetchData(nim) {
    const response = await fetch('https://mpc-be.netlify.app/?nim=' + nim);
    return response;
  }

  const $btnSearch = $('#searchBtn');
  const $inputSearch = $('#searchInput');
  $btnSearch.on('click', async function (e) {
    e.preventDefault();
    const searchValue = $inputSearch.val();
    const data = await fetchData(searchValue);
    if (data.status === 200) {
      const result = await data.json();
      $('#name').text(result.name);
      $('#paid').text(result.paid);
      $('#nim').text(result.nim);
      $('#lastUpdated').text(result.lastUpdated);
      $('#result > div').removeClass('d-none');
      $("#result")
        .removeClass('alert-info alert-danger alert-secondary')
        .addClass(result.paid ? 'alert-success' : 'alert-secondary');
      $('#holder').addClass('d-none');
    } else {
      $('#result > div').addClass('d-none');
      $("#result").removeClass('alert-info').addClass('alert-danger');
      $('#holder').parent().removeClass('d-none');
      $('#holder').removeClass('d-none');
      $('#holder').text('Not Found');
    }
  });
});