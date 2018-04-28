export interface Entity{
  id: string;
  name: string;
  type: string;
 }
 
export interface RelateEntities{
  center: Entity;
  relate?: RelateEntities[];
  depth: number;
}

export interface Relation{
  name: string
}

export interface Relations{
  relations: Relation[];
  offset: number;
  count: number;
}