export default class Circle {
    static distance: number = 10;
    constructor(x: number, y: number, radius?: number, text?: string){
        this.baseX = x;
        this.baseY = y;
        if(radius !== undefined){
            this.radius = radius;
        }
        if(text){
            this.text = text;
        }
    }

    baseX: number;
    baseY: number;
    private diffX: number[] = [];
    private diffY: number[] = [];

    get x(){
        let r = Circle.distance * this.baseX;
        this.diffX.forEach(i => {
            r = r+i;
        })
        return r;
    }

    get y(){
        let r = Circle.distance * this.baseY;
        this.diffY.forEach(i => {
            r = r+i;
        })
        return r;
    }

    set x(num){
        this.diffX.push(num - this.x);
    }

    set y(num){
        this.diffY.push(num - this.y);
    }

    radius: number = 0;
    text: string = '';
}