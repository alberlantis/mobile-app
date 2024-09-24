function splitUrlAndText(input: string): [string, string] {
  const urlRegex = /https?:\/\/[^\s]+/;
  const urlMatch = input.match(urlRegex);
  if (urlMatch) {
    const imageUrl = urlMatch[0];
    const description = input.replace(imageUrl, "").trim();
    return [imageUrl, description || ""];
  }

  return ["", input.trim()];
}

export default splitUrlAndText;
