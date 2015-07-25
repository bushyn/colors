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
         return {borderColor: 'white', txt: this.props.color, cls: 'txt'}
    },
    onMouseEnter() {
        this.setState({borderColor: invertColor(this.props.color)})
    },
    onMouseLeave() {
        this.setState({borderColor: 'white'})
    },
    onClick() {
        window.getSelection().removeAllRanges()
        let range = document.createRange()
        range.selectNodeContents(React.findDOMNode(this.refs.txt))
        window.getSelection().addRange(range)
        try {
            if (document.execCommand('copy')) {
                this.setState({txt: 'COPIED', cls: 'txt unselectable'})
                setTimeout(()=>this.setState({txt: this.props.color, cls: 'txt'}), 500)
            } else {
                console.log('unable to copy')
            }
        } catch(err) {
            console.log('unable to copy')
        }
        window.getSelection().removeAllRanges()
    },
    render() {
        return <div className='swatch'
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.onClick} onDoubleClick={this.onClick}
                    style={{borderColor: this.state.borderColor}}>
                <div className="color" style={{backgroundColor: this.props.color}}></div>
                <div ref='txt' className={this.state.cls}>{this.state.txt}</div>
        </div>
    }
})

let Kit = React.createClass({
    render() {
        return <div className='kit'>
            <div className='from'>{this.props.name}</div>
            {this.props.list.map(v => <Swatch key={v} color={v}/>)}
        </div>
    }
})

React.render(<div>{Object.keys(kits).map(v=><Kit key={v} name={v} list={kits[v]}/>)}</div>,  document.body)

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
