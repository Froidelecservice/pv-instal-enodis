function exportExcel(data) {
  const headers = Object.keys(data);
  const values = headers.map((h) => data[h] || "");

  const tableRows =
    "<tr>" +
    headers.map((h) => `<th>${h}</th>`).join("") +
    "</tr>" +
    "<tr>" +
    values.map((v) => `<td>${v}</td>`).join("") +
    "</tr>";

  const html =
    `<html><head><meta charset="UTF-8"></head><body><table border="1">${tableRows}</table></body></html>`;

  const blob = new Blob([html], {
    type: "application/vnd.ms-excel;charset=utf-8;"
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "pv-instal-enodis.xls";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}