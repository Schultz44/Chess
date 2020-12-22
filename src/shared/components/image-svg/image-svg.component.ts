import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'image-svg',
  templateUrl: './image-svg.component.html',
  styleUrls: ['./image-svg.component.scss']
})
export class ImageSvgComponent implements OnInit {
  @Input() width = '100px';
  @Input() height = '100px';
  @Input() color = 'white'
  @Input() index = 0;
  private _path = '';
  @Input() set path(value) {
    fetch(`${value}`)
      .then(data => data.text())
      .then(text => {
        this._path = this.changeSVGFillColor(text, this.color)
        this._path = this.changeSVGHeight(this._path)
        this._path = this.changeSVGWidth(this._path)
        this.writeSVGToDocument(this._path)
      })

  }
  get path() {
    return this._path;
  }
  constructor() { }

  ngOnInit() {

  }
  changeSVGHeight(svgText: string): string {
    return svgText.replace(/height=".*"/g, `height="${this.height}"`)
  }
  changeSVGWidth(svgText: string) {
    return svgText.replace(/width=".*"/g, `width="${this.width}"`)

  }
  changeSVGFillColor(svgText: string, color: string): string {
    const text = svgText.replace(/fill:#000000/gi, `fill:${color}`);
    return text;
  }
  writeSVGToDocument(svgText: string) {
    let svg = document.createElement('div')
    svg.innerHTML = svgText
    document.getElementById(this.index.toString()).appendChild(svg)
  }
}
