import Circle from '../class/Circle';

export interface Entity{
  id: string;
  name: string;
  type: string;
 }
 
export interface RelateEntities{
  center: Entity;
  relate?: Entity[];
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


export interface Circles{
  center?:Circle;
  around?: Circle[];
  distance?: Number;
}