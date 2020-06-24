import React, { Component } from 'react';
import './MiniPalette.css'

class MiniPalette extends Component {
    render() {
        const {paletteName, colors, emoji} = this.props;
        return (
            <div className="MiniPalette">
                <div className="MiniPalette-colors">
                    {colors.map(color => (
                        <div className="MiniPalette-box" style={{backgroundColor : color.color}}></div>
                    ))}
                </div>
                <div className="MiniPalette-footer">
                    <span>{paletteName}</span>
                    <span>{emoji}</span>
                </div>
            </div>
        );
    }
}

export default MiniPalette;