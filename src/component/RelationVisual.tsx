import * as React from 'react';
import { Row, Col } from 'antd';
import { Entity, RelateEntities } from '../interface/common';
import './RelationVisual.css'
import * as PIXI from 'pixi.js';
import * as $ from 'jquery';

const { Graphics } = PIXI;

interface Props{
  entities?: Entity[];
  relateEntities?: RelateEntities
}

class RelationVisual extends React.Component<Props>{
  app: PIXI.Application;

  constructor(p:Props){
    super(p);
  }

  componentDidMount(){
    const view = this.refs.canvas as HTMLElement;
    let app = new PIXI.Application({width: $(view).width(), height: $(view).height()});
    view.appendChild(app.view);
    this.app = app;
    this.draw();
    this.listen();
  }

  // 画出最基本的图案
  draw(){
    let rectangle = new Graphics();
    rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, 64, 64);
    rectangle.endFill();
    rectangle.x = 170;
    rectangle.y = 170;
    this.app.stage.addChild(rectangle);
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