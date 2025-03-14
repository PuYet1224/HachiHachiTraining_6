export interface ModuleTreeDTO {
  Company: number;
  Code: number;
  ModuleID: string;
  Vietnamese: string;
  English?: string | null;
  Japanese?: string | null;
  Chinese?: string | null;
  OrderBy: number;
  GroupID?: number | null;
  IsVisible: boolean;
  TypeData?: string | null;
  ImageSetting?: string | null;
  Icon?: string | null;
  ListGroup?: ModuleTreeDTO[];
  ListFunctions?: any[];
  ListAPI?: any[];
}
