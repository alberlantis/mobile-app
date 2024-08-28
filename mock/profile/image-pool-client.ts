
export interface ImagePool {
  author: string
  download_url: string
  height: number
  width: number
  id: string
  url: string
}

export async function fetchImages (page: number = 1): Promise<ImagePool[]> {
  return await fetch(`https://picsum.photos/v2/list?page=${page}&limit=20`)
    .then(response => response.json())
    .then(response => response)
    .catch(error => {
      console.error('Error fetching image:', error);
    });
}
