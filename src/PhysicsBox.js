import React, { Component } from 'react';
import Matter from 'matter-js';
import { getDiceImage } from './GetDiceImage';

class PhysicsBox extends Component {
  constructor(props) {
    super();
    this.state = {
      Engine: Matter.Engine,
      Render: Matter.Render,
      World: Matter.World,
      Bodies: Matter.Bodies,
      Body: Matter.Body,
      hasWorld: false,
    };
  }

  roll(dice) {
    if (this.state.hasWorld) {
      let el = document.getElementById('physics-container');
      console.log(el)
      el.removeChild(el.childNodes[0])
    }
    // create an engine
    let engine = this.state.Engine.create();
    engine.world.gravity.y = 0;

    // create a renderer
    let render = this.state.Render.create({
        element: document.getElementById('physics-container'),
        engine: engine,
        options: {
          width: 800,
          height: 600,
          pixelRatio: 1,
          background: 'transparent',
          wireframes: false,
        }
    });

    let bodies = dice.map((die, i) => {
      console.log(die, i)
      return this.state.Bodies.rectangle(65 * (i), 100 * (i/3), 50, 50, {
        render: {
          sprite: {
            texture: getDiceImage(die.value),
            xScale: .1,
            yScale: .1
          }
        }
      })
    })

    this.state.World.add(engine.world, bodies);

    bodies.forEach((body) => {
      this.state.Body.applyForce( body, {x: body.position.x, y: body.position.y}, {x: 0.1, y: .1});
    })
    // walls
    let walls = [
      this.state.Bodies.rectangle(400, 0, 810, 10, { isStatic: true }),
      this.state.Bodies.rectangle(400, 600, 810, 10, { isStatic: true }),
      this.state.Bodies.rectangle(0, 300, 10, 810, { isStatic: true }),
      this.state.Bodies.rectangle(800, 300, 10, 810, { isStatic: true }),
    ];

    // add all of the bodies to the world
    this.state.World.add(engine.world, walls);

    // run the engine
    this.state.Engine.run(engine);

    // run the renderer
    this.state.Render.run(render);
    this.setState({
      hasWorld: true
    })
  }

  render() {
    return (
      <div className='PhysicsBox'>
        <div id='physics-container'></div>
      </div>
    );
  }
}

export default PhysicsBox;
