export async function loadData(filename) {
  const res = await fetch(filename);
  const text = await res.text();
  return text.split("\r\n");
}
