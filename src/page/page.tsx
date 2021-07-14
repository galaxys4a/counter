import React from 'react';

import { SquareNumber } from '../components';
import { ThemeContext, MoodContext } from '../context';

const MAXIMUM_NUMBER = 1000;

class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
        };
    }

    render() {
        if (this.state.hasError) {
            return <div>"Something went wrong!"</div>
        }
        return this.props.children;
    }
}

type PageState = {
    count: number,
    inputValue: string,
    isFetching: boolean,
    windowWidth: number,
};

class Page extends React.PureComponent<{}, PageState> {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            inputValue: '',
            isFetching: false,
            windowWidth: window.innerWidth,
        };

        this.handlePlusClick = this.handlePlusClick.bind(this);
        this.handleMinusClick = this.handleMinusClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSetClick = this.handleSetClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);

        document.title = `${this.state.count}`;
    }

    handlePlusClick() {
        this.setState(state => ({
            //count: state.count + 1,
            count: (state.count + 1) % MAXIMUM_NUMBER,
        }));
    }

    handleMinusClick() {
        this.setState(state => ({
            //count: state.count - 1,
            count: (state.count - 1 + MAXIMUM_NUMBER) % MAXIMUM_NUMBER,
        }));
    }

    handleInputChange(event) {
        this.setState({
            inputValue: event.target.value,
        });
    }

    handleSetClick() {
        this.setState(state => ({
            count: parseInt(state.inputValue),
            inputValue: '',
        }));
    }

    handleResetClick() {
        this.setState({
            count: 0,
            inputValue: '',
        });
    }

    handleWindowResize() {
        this.setState({
            windowWidth: window.innerWidth,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);

        this.setState({ isFetching: true });
        fetch('https://www.random.org/integers/?num=1&min=0&max=999&col=11&base=10&format=plain&rnd=new')
        .then(response => response.json())
        .then(number => {
            this.setState({
                count: number,
                isFetching: false,
            });
        });
    }

    componentDidUpdate() {
        document.title = `${this.state.count}`;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    render() {
        const { count, inputValue, isFetching, windowWidth } = this.state;

        return (
            <ThemeContext.Consumer>
                {theme => (
                    <div className={`app ${theme}`}>
                        <main className="App-header">
                            <h2>
                                Class Counter<br />
                                Window width = {windowWidth}
                            </h2>
                            <ErrorBoundary>
                                <div className="counts">
                                    <div className="count">
                                        <SquareNumber number={Math.floor(count / 100)} />
                                    </div>
                                    <div className="count">
                                        <SquareNumber number={Math.floor(count / 10) % 10} />
                                    </div>
                                    <div className="count">
                                        <SquareNumber number={count % 10} />
                                    </div>
                                </div>
                            </ErrorBoundary>
                            <div className="controllers--all">
                                <div className="controllrs--group">
                                    <button disabled={isFetching} onClick={this.handlePlusClick} className="controller">+</button>
                                    <button disabled={isFetching} onClick={this.handleMinusClick} className="controller">-</button>
                                </div>
                                <div className="controllrs--group offset-top-20">
                                    <input disabled={isFetching} onChange={this.handleInputChange} value={inputValue}/>
                                    <button disabled={isFetching} onClick={this.handleSetClick} className="controller">Set</button>
                                </div>
                                <button disabled={isFetching} onClick={this.handleResetClick} className="controller">Reset</button>
                            </div>
                        </main>
                        <MoodContext.Consumer>
                            {mood => (
                                <div className="mood">{mood}</div>
                            )}
                        </MoodContext.Consumer>
                    </div>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default Page;
