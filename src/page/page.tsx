import React from 'react';

import { SquareNumber } from '../components'
// import { ThemeContext, MoodContext } from '../context'

const COUNTER_MAXIMUM = 100;

// https://www.random.org/integers/?num=1&min=1&max=99&col=11&base=10&format=plain&rnd=new

class Page extends React.PureComponent {
    render() {
        return (
            <div className="app">
                <main className="App-header">
                    <h2>
                        Class Counter<br />
                    </h2>
                    <div className="counts">
                        <div className="count">
                            <SquareNumber number={Math.floor(42 / 10)} />
                        </div>
                        <div className="count">
                            <SquareNumber number={42 - Math.floor(42 / 10) * 10} />
                        </div>
                    </div>
                    <div className="controllers--all">
                        <div className="controllrs--group">
                            <button className="controller">+</button>
                            <button className="controller">-</button>
                        </div>
                        <div className="controllrs--group offset-top-20">
                            <input />
                            <button className="controller">Set</button>
                        </div>
                        <button className="controller">reset</button>
                    </div>
                </main>
            </div>
        );
    }
}

export default Page;
