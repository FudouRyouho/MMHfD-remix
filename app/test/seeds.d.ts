import { SeedsData } from "./seeds.type.";

declare module "*.json" {
  const value: SeedsData; // Usa tu interfaz SeedsData
  export default value;
}
