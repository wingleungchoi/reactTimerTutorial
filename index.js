;(function(){
var TimerExample = React.createClass({

    getInitialState: function(){

        // This is called before our render function. The object that is 
        // returned is assigned to this.state, so we can use it later.

        return { 
          elapsed: 0,
          counting: null
        };
    },

    componentDidMount: function(){

        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:

        this.setState({counting: true});
        this.timer = setInterval(this.tick, 50);
    },

    componentWillUnmount: function(){

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:

        clearInterval(this.timer);
    },

    tick: function(){

        // This function is called every 50 ms. It updates the 
        // elapsed counter. Calling setState causes the component to be re-rendered

        this.setState({elapsed: new Date() - this.props.start});
    },

    stopTimer: function(){
      clearInterval(this.timer);
    },

    resumeTimer: function() {
      this.timer = setInterval(this.tick, 50);
    },

    toggleTimer: function() {
      var counting = this.state.counting;
      if (counting) {
        this.stopTimer();
      } else{
        this.resumeTimer();
      };
      this.setState({counting: !counting});
    },

    render: function() {
        
        var elapsed = Math.round(this.state.elapsed / 100);

        // This will give a number with one digit after the decimal dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);

        // var counting = this.state.counting + " ";

        var buttonString = this.state.counting ? 'Stop' : 'Resumt';

        // Although we return an entire <p> element, react will smartly update
        // only the changed parts, which contain the seconds variable.

        // return <p onClick={this.toggleTimer}>This example was started <b>{seconds} seconds</b> ago.</p>;
        return <div>
          <p>{seconds} Seconds</p>
          <button onClick={this.toggleTimer}>{buttonString} Counting</button>
        </div>;
    }
});


ReactDOM.render(
    <TimerExample start={Date.now()}/>,
    document.getElementById('container')
);}());