import Circle from '../class/Circle';

/**
 * 
 * @param c1 
 * @param c2 
 * 
 * true => 两圆没有相碰
 * false => 两圆相碰
 */
export function hitTestCircle(c1: Circle, c2: Circle): boolean{
    const x2 = (c1.x  - c2.x) * (c1.x  - c2.x);
    const y2 = (c1.y  - c2.y) * (c1.y  - c2.y);
    return (Math.sqrt( x2 + y2) - (c1.radius + c2.radius)) > 0;
}