import { v4 as uuidv4 } from "uuid";

class ModelUtils {
  static generateUUID(): string  {
    return uuidv4();
  }
}

export default ModelUtils;