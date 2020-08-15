export const getExtensionForMimeType = (mimeType: string): string => {
  let extension: string;
  switch (mimeType) {
    case "image/jpeg":
      extension = "jpg";
      break;
    case "image/png":
      extension = "png";
      break;
    case "image/webp":
      extension = "webp";
      break;
    case "image/gif":
      extension = "gif";
      break;
    default:
      extension = "";
  }
  return extension;
};
