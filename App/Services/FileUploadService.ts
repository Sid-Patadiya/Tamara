import axios from 'axios';
import { ApiConfig } from '@ApiConfig/index';

export const uploadFileType = {
  avatar: 'avatar',
};

export const changeProfilePictureService = async (
  imageData: any,
  type: any,
) => {
  if (uploadFileType.avatar === type) {
  }
  try {
    const response = await axios.get(ApiConfig.changeUserAvatar);
    if (response.data) {
      const res: any = await awsUpload(response.data.data, imageData);
      if (res?.status === 200) {
        return true;
      }
      return res;
    }
    return false;
  } catch (error: any) {
    console.log(error);
  }
};

export const awsUpload = async (
  link: any,
  image: any,
  returnFileUrl = false,
) => {
  try {
    console.log('image: ', link, image);
    let url = link;
    if (returnFileUrl) {
      url = link.uploadURL;
    }
    // headers: {
    //   'x-ms-blob-type': `BlockBlob`,
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': 'multipart/form-data',
    // },
    const response = await fetch(url, {
      method: 'PUT',
      body: image,
    });
    if (returnFileUrl) {
      return { fetchUrl: link?.getURL };
    }
    console.log('upload', response);
    return response;
  } catch (error) {
    console.log('%%%%%error', error);
  }
};
