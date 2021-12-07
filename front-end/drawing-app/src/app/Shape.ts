/* export interface Shape {
  type: string
  id: number
  postion: number[]
  color: string
  strokeWidth: number
  strokeColor: string
  values: number[]

} */

export class Shape {
    type!: string
    id!: number
    postion!: number[]
    color!: string
    strokeWidth!: number
    strokeColor!: string
    values!: number[]

    constructor(type: string,
                id: number,
                position: number[],
                color: string,
                strokeWidth: number,
                strokeColor: string,
                values: number[]
                  ){
      this.type = type;
      this.id = id;
      this.postion = position;
      this.color = color;
      this.strokeWidth = strokeWidth;
      this.strokeColor = strokeColor;
      this.values = values;
    }
    
}