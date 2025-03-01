import { ImageWriter, ImageWriterParameters } from "@nut-tree-fork/provider-interfaces";
import { imageToJimp } from "@nut-tree-fork/shared";

export default class implements ImageWriter {
  store(parameters: ImageWriterParameters): Promise<void> {
    return new Promise((resolve, reject) => {
      const jimpImage = imageToJimp(parameters.image);
      jimpImage
        .writeAsync(parameters.path)
        .then((_) => resolve())
        .catch((err) => reject(err));
    });
  }
}
