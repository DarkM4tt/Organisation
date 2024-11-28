export function formatDate(isoString) {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "pm" : "am";

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

export function formatDateOnly(isoString) {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatTimeOnly(isoString) {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "Invalid time";
  }

  const hours = date.getHours() % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "pm" : "am";

  return `${hours}:${minutes} ${ampm}`;
}
