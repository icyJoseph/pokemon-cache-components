
export async function uuidMarker() {
  const { uuid } = await fetch("https://httpbin.dev/uuid").then((res) =>
    res.json()
  );

  return uuid;
}
