var data;

async function fecthWithAsyncAwait() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    data = await res.json();
    renderTable(data);
  } catch (error) {
    console.error("There was a problem fetching the data:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fecthWithAsyncAwait();
});

function renderTable(data) {
  const table = document.getElementById("coin-table");
  if (!data) return;
  table.innerHTML = "";
  data.forEach((coin) => {
    const row = table.insertRow();
    row.classList.add("row");
    row.innerHTML = `
        <td><img src="${coin.image}" class="img-sec" alt="${
      coin.name
    }" width="30" height="30"></td>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td class="right">$${coin.current_price}</td>
        <td class="right">$${coin.total_volume}</td>
        <td class="green right">${coin.price_change_percentage_24h}%</td>
        <td class="right">Mkt cap : ${coin.market_cap}</td>
      `;
  });
}

function searchCoins() {
  const input = document.getElementById("search-input").value.toLowerCase();
  if (!data) return;
  const filteredData = data.filter(
    (coin) =>
      coin.name.toLowerCase().includes(input) ||
      coin.symbol.toLowerCase().includes(input)
  );
  console.log(filteredData);
  renderTable(filteredData);
}
document.getElementById("search-input").addEventListener("input", searchCoins);
document.getElementById("sort").addEventListener("click", () => {
  if (!data) return;
  const sortedData = data.sort(
    (a, b) => parseFloat(b.market_cap) - parseFloat(a.market_cap)
  );
  renderTable(sortedData);
});
document.getElementById("sort1").addEventListener("click", () => {
  if (!data) return;
  const sortedData = data.sort(
    (a, b) =>
      parseFloat(b.price_change_percentage_24h) -
      parseFloat(a.price_change_percentage_24h)
  );
  renderTable(sortedData);
});
