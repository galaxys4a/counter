import React from 'react';

import { MoodContext, ThemeContext } from '../context'
import { SquareNumber } from '../components'

const COUNTER_MAXIMUM = 100

const Page = () => {
    return (
        <div className="app">
            <main className="App-header hook">
                <h2>
                    Hook Counter<br />
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
                    <div className="controllrs--group offset-top-20">
                        <input />
                        <button onClick={() => {}} className="controller">Substruct</button>
                    </div>
                    <button className="controller">reset</button>
                </div>
            </main>
            {/* <div className="mood">{mood}</div> */}
        </div>
    )
}

export default Page;
