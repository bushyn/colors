let kits = {
    'SQUARE UI': ['#232323', '#166549', '#1B7E5A', '#B95752', '#E76E66', '#695B8E',
                  '#544972', '#704B62', '#8C5E7A', '#EBE8DF', '#FBFBFB', '#BCD7DD',
                  '#9BC2CC', '#79AEBA', '#579AA9', '#457B87'],

    'FLAT UI': ['#1ABC9C', '#16A085', '#2ECC71', '#27AE60', '#3498DB', '#0C8AC8',
                '#2980B9', '#9B59B6', '#8E44AD', '#34495E', '#2C3E50', '#F1C40F',
                '#F39C12', '#E67E22', '#D35400', '#E74C3C', '#C0392B', '#ECF0F1',
                '#BDC3C7', '#95A5A6', '#7F8C8D'],

    'BASE 16': ['#181818', '#282828', '#383838', '#585858', '#B8B8B8', '#D8D8D8',
                '#E8E8E8', '#F8F8F8', '#AB4642', '#DC9656', '#F7CA88', '#A1B56C',
                '#86C1B9', '#7CAFC2', '#BA8BAF', '#A16946'],

    'TUMBLR PATTRN': ['#2D4762', '#3A98C8', '#E98C29', '#CF5530', '#767DBD',
                       '#35BD7F', '#7D8A96']
}

let Swatch = React.createClass({
    getInitialState() {
         return { invColor: invertColor(this.props.color), cls: 'swatch',
                  txt: this.props.color, hover: false }
    },
    toggle() { this.setState({hover: !this.state.hover}) },
    onClick() {
        window.getSelection().removeAllRanges()
        let range = document.createRange()
        range.selectNode(React.findDOMNode(this.refs.txt))
        window.getSelection().addRange(range)
        try {
            if (document.execCommand('copy')) {
                this.setState({txt: 'COPIED', cls: 'swatch unselectable'})
                setTimeout(()=>this.setState({txt: this.props.color, cls: 'swatch'}), 700)
            } else {
                console.log('unable to copy')
            }
        } catch(err) {
            console.log('unable to copy')
        }
        window.getSelection().removeAllRanges()
    },
    render() {
        return <div className={this.state.cls}
                    onMouseEnter={this.toggle}
                    onMouseLeave={this.toggle}
                    onClick={this.onClick}
                    style={{borderColor: this.state.hover? this.state.invColor:'white'}}>
                <div className="color" style={{backgroundColor: this.props.color}}></div>
                <div ref='txt' className='txt'>{this.state.txt}</div>
        </div>
    }
})

let Kit = React.createClass({
    render() {
        return <section className='kit'>
            <h1 className='from'>{this.props.name}</h1>
            {this.props.list.map(v => <Swatch key={v} color={v}/>)}
        </section>
    }
})

React.render(<article>{Object.keys(kits).map(v => <Kit key={v} name={v} list={kits[v]}/>)}</article>, document.body)

function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1);
    color = parseInt(color, 16);
    color = 0xFFFFFF ^ color;
    color = color.toString(16);
    color = ("000000" + color).slice(-6);
    color = "#" + color;
    return color;
}
