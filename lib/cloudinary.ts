/**
 * Inject a Cloudinary transform into a CDN URL.
 * If the URL isn't from Cloudinary the original string is returned unchanged.
 */
export function withFaceCrop(url: string, aspect: string, width = 1600): string {
  if (!url.includes("res.cloudinary.com")) return url;
  const transform = `c_fill,g_auto:faces,ar_${aspect},w_${width},f_auto,q_auto`;
  return url.replace("/upload/", `/upload/${transform}/`);
}
