function exportCSV(data) {
  const headers = Object.keys(data);
  const values = headers.map((h) => (data[h] || "").toString().replace(/"/g, '""'));

  const csvContent =
    headers.join(";") + "\n" + values.map((v) => `"${v}"`).join(";") + "\n";

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "pv-instal-enodis.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}