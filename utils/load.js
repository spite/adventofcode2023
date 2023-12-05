export async function loadData(filename) {
  const text = await loadRawData(filename);
  return text.split("\r\n");
}

export async function loadRawData(filename) {
  const res = await fetch(filename);
  const text = await res.text();
  return text;
}
