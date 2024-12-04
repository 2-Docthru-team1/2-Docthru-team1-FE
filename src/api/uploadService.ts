import { putRequest } from './api';

export async function uploadImageToEC2(ec2Url: string, imageFile: Blob | File) {
  if (!(imageFile instanceof File || imageFile instanceof Blob)) {
    throw new Error('유효하지 않은 이미지 파일입니다.');
  }

  const result = await putRequest(ec2Url, imageFile);
  return result;
}
