import * as React from 'react';
import { Row, Col } from 'antd';
import * as PIXI from 'pixi.js';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { Entity, RelateEntities, Circles } from '../interface/common';
import Circle from '../class/Circle';
import './RelationVisual.css'
import { hitTestCircle } from '../util';

const { Graphics, Text } = PIXI;

// 中心圆的默认选项
const Base = new Circle(0, 0, 50);


Base.x += 200;
Base.y += 200;

interface Props{
  entities?: Entity[];
  relateEntities?: RelateEntities
}

class RelationVisual extends React.Component<Props>{
  app: PIXI.Application;
  circles: Circles = {around: []};
  constructor(p:Props){
    super(p);
  }

  componentDidMount(){
    const view = this.refs.canvas as HTMLElement;
    let app = new PIXI.Application({width: $(view).width(), height: $(view).height()});
    view.appendChild(app.view);
    this.app = app;
    app.renderer.backgroundColor = 0xffffff;
    this.preprocess();
    this.draw();
    this.listen();
  }

  // 预处理数据
  preprocess(){
    let circles = this.circles;
    if(this.props.relateEntities){
      const center = this.props.relateEntities.center;
      // 图的中心圆
      circles.center = _.extend(Base, { text: center.name});
      const relateEntities = this.props.relateEntities;
      // 其他的圆的位置
      if(relateEntities.relate){
        const number = relateEntities.relate.length;
        if(number >= 1){
          // 碰撞检测,如果两个圆碰撞了，那么增加distance的长度
          const first = new Circle(0, 1, Base.radius);
          const second = new Circle(
              Math.sin(Math.PI * 2 / number),
              Math.cos(Math.PI * 2 / number), 
              Base.radius);          
          while(!hitTestCircle(first, second)){
            Circle.distance += Base.radius;
          }
          // 画出所有的圆
          for(let i = 0;i < number;i ++){
            const cir = new Circle(
              Math.sin(Math.PI * 2 * i/ number), 
              Math.cos(Math.PI * 2 * i/ number),
              Base.radius,
              relateEntities.relate[i].name
            );
            cir.x += Base.x;
            cir.y += Base.y;
            circles.around!.push(cir);
          }
        }
      }
    }
  }


  // 画出最基本的图案
  draw(){
    const { center, around } = this.circles;
    // 画出连线
    if(around && center){
      for(const item of around){
        let line = new Graphics();
        line.lineColor = 0x000000;
        line.lineWidth = 1;
        line.moveTo(center.x, center.y);
        line.lineTo(item.x, item.y);
        this.app.stage.addChild(line);
      }
    }

    const dCircles = _.concat([center], around);
    // 画出圆
    if(dCircles){
      for(const item of dCircles){
        let circle = new Graphics();
        circle.beginFill(0x66CCFF);
        circle.drawCircle(item!.x, item!.y, item!.radius);
        circle.endFill();
        this.app.stage.addChild(circle);

        circle.on('click', function(){
          alert('hello wolrd');
        })

        // 画出文字
        const name = new Text(item!.text);
        name.style.fontSize = item!.radius / 2.5;
        name.position.set( item!.x, item!.y);
        this.app.stage.addChild(name);
      }
    }
  }

  // 创建时间监听
  listen(){

  }

  render(){
    return (
      <div style={{ maxWidth: 800, border: '1px solid grey', minHeight: 500, margin: '0 auto'}}>
        <Row>
          <Col span={6} className="entity-list">
            {
              this.props.entities && this.props.entities.map(entity => {
                return (
                  <div className="entity-item" key={entity.id}>
                    {
                      entity.name
                    }
                  </div>
                )
              })
            }
          </Col>
          <Col span={18}>
            <div ref="canvas" style={{ minHeight: 500 }}>
            </div>            
          </Col>
        </Row>
      </div>
    )
  }
}

export default RelationVisual;