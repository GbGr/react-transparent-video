import { Renderer } from 'ogl'

export default class WebGLRenderer extends Renderer {
  constructor(options: Partial<WebGLRendererOptions>) {
    super(options)
  }

  setSize(width: number, height: number): void {
    this.width = width
    this.height = height

    this.gl.canvas.width = width * this.dpr
    this.gl.canvas.height = height * this.dpr
  }
}

interface WebGLRendererOptions {
  canvas: HTMLCanvasElement,
  width: number
  height: number
  dpr: number,
  alpha: boolean,
  depth: boolean,
  stencil: boolean,
  antialias: boolean,
  premultipliedAlpha: boolean,
  preserveDrawingBuffer: boolean,
  powerPreference: string,
  autoClear: boolean,
  webgl: number,
}

