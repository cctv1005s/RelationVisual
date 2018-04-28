import * as React from "react";
import RelationVisual from './component/RelationVisual';
import 'antd/dist/antd.css';
import * as Mock from 'mockjs';
import { Entity, RelateEntities } from './interface/common';

const Random = Mock.Random;

const mockData = Mock.mock({
  'data|10':[{
    'id|+1': 1,
    name: () => Random.cname(),
    type: 'person'
    }
  ]
});

const relateEntities: RelateEntities = {
  center: {
    id: '1',
    name: Random.cname(),
    type: 'person',
  },
  relate: mockData.data,
  depth: 1
};

class App extends React.Component {
  render() {
    return (
      <div>
        <RelationVisual 
          entities={mockData.data} 
          relateEntities={relateEntities}
        />
      </div>
    );
  }
}

export default App;
