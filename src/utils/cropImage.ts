import type { Area } from 'react-easy-crop';

export type ImageCropAspect = 'avatar' | 'cover' | 'preview';

export const CROP_ASPECT: Record<ImageCropAspect, number> = {
  avatar: 1,
  cover: 3,
  preview: 16 / 9,
};

export const CROP_OUTPUT: Record<ImageCropAspect, { width: number; height: number }> = {
  avatar: { width: 512, height: 512 },
  cover: { width: 1920, height: 640 },
  preview: { width: 1280, height: 720 },
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

export async function getCroppedImageFile(
  imageSrc: string,
  pixelCrop: Area,
  aspect: ImageCropAspect,
  fileName: string
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const output = CROP_OUTPUT[aspect];
  canvas.width = output.width;
  canvas.height = output.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available');

  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, output.width, output.height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) resolve(result);
        else reject(new Error('Failed to encode cropped image'));
      },
      'image/jpeg',
      0.92
    );
  });

  const baseName = fileName.replace(/\.[^.]+$/, '') || 'image';
  return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
}
