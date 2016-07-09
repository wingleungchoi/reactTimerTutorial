// Redux
// https://egghead.io/courses/getting-started-with-redux
// https://egghead.io/articles/gentle-introduction-to-the-react-flux-architecture
// https://egghead.io/courses/building-react-applications-with-idiomatic-redux
// https://www.youtube.com/watch?v=p74282nDMX8

// http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/
// http://andrewhfarmer.com/getting-started-tutorials/
// https://egghead.io/courses/getting-started-with-redux
// http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html
;(function(){

// This is more complex example that uses two components -
// a service chooser form, and the individual services inside it.

var CourseChooser = React.createClass({
    getInitialState: function(){
        return {
            total:        0,
            searchString: ''
        };
    },

    handleChange: function(e){
        this.setState({ searchString: e.target.value });
    },

    addTotal: function( price ) {
        this.setState( { total: this.state.total + price } );
    },

    render: function() {
        var self = this;
        var searchString = this.state.searchString.trim().toLowerCase();

        if(searchString.length > 0){

            var courses = this.props.items.filter(function(c){
                return c.name.toLowerCase().match( searchString );
            });

        } else {
            var courses = this.props.items;
        }
        courses = courses.map(function(c){
            return <Course name={c.name} url={c.url} price={c.price} active={c.active} addTotal={self.addTotal} />;
        });


        return <div>
            <h1>Our courses</h1>
            <input type="text" value={searchString} onChange={this.handleChange} placeholder="Type here" />

            <div id="courses">
                {courses}
                <p id="total">Total <b>${this.state.total.toFixed(2)}</b></p>
            </div>
        </div>;
    }

});

var Course = React.createClass({
    getInitialState: function() {
        return { active: false };
    },

    clickHandler: function() {
        var active = !this.state.active;

        this.setState({ active: active });

        this.props.addTotal( active ? this.props.price : -this.props.price);
    },

    render: function() {
        return <p className={ this.state.active ? 'active' : '' } onClick={this.clickHandler}>
                    {this.props.name} URL: {this.props.url} <b>${this.props.price.toFixed(2)}</b>
               </p>;
    }
});

var courses = [

    { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/', price: 500},
    { name: 'AngularJS', url: 'https://angularjs.org/', price: 450},
    { name: 'jQuery', url: 'http://jquery.com/', price: 400},
    { name: 'Prototype', url: 'http://www.prototypejs.org/', price: 350},
    { name: 'React', url: 'http://facebook.github.io/react/', price: 300},
    { name: 'Ember', url: 'http://emberjs.com/', price: 250},
    { name: 'Knockout.js', url: 'http://knockoutjs.com/', price: 200},
    { name: 'Dojo', url: 'http://dojotoolkit.org/', price: 150},
    { name: 'Mootools', url: 'http://mootools.net/', price: 500},
    { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/', price: 500},
    { name: 'Lodash', url: 'http://lodash.com/', price: 500},
    { name: 'Moment', url: 'http://momentjs.com/', price: 500},
    { name: 'Express', url: 'http://expressjs.com/', price: 500},
    { name: 'Koa', url: 'http://koajs.com/', price: 500},

];

ReactDOM.render(
    <CourseChooser items={ courses } />,
    document.getElementById('container')
);


}());