export async function uuidMarker() {
  const { uuid } = await fetch("https://httpbin.org/uuid").then((res) =>
    res.json()
  );

  return uuid;
}
