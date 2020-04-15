import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard'
import './ColorBox.css'

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {copied : false}
        this.handleCopy = this.handleCopy.bind(this);
    }
    handleCopy(){
        this.setState({copied : true}, () => {
            setTimeout(() => {
                this.setState({copied : false})
            },2000)
        })
    }
    render() {
        const {background, name} = this.props;
        const {copied} = this.state;
        return (
            <CopyToClipboard 
                text={background}
                onCopy={this.handleCopy}>
                <div className="ColorBox" style={{background}}>
                    <span className='name'>{name}</span>
                    <span className='copy'>copy</span>
                    <span className='more'></span>
                    <span className={`overlay ${copied && 'copied'}`} style={{background}}></span>
                    <div className={`copy-display ${copied && 'c'}`}>
                        <h1 className={`copy-text ${copied && 'c'}`}>copied!</h1>
                        <p className={`copy-color ${copied && 'c'}`}>{background}</p>
                    </div>
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;