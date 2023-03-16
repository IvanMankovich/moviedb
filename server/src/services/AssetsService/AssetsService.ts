import { Asset } from '../../models/AssetModel';
import { ErrorService } from '../ErrorService';

export interface IFile {
  contentType: string;
  data: Buffer;
  size?: number;
}

class AssetsService {
  async addAssets(assetData: IFile[]) {
    if (assetData.length) {
      const files = await Asset.insertMany(assetData).catch((e) => console.log(e));
      return files;
    } else {
      throw ErrorService.BadRequest('Files are not provided');
    }
  }

  async removeAssets() {
    throw ErrorService.BadRequest('WIP');
  }
}

export const assetsService = new AssetsService();
