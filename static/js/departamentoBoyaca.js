function applyFilter() {
    const filter = document.getElementById("filter-select").value;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('filter', filter);
    window.location.search = urlParams.toString();
}