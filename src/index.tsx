import * as React from 'react'
import { Geometry, Mesh, Program, Texture } from 'ogl'
import WebGLRenderer from './Renderer'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

interface TransparentVideoProps extends React.HTMLProps<HTMLVideoElement> {
  videoClassname?: string
}

export const TransparentVideo: React.FC<TransparentVideoProps> = (props) => {
  const videoStyle: React.CSSProperties = props.style || {}
  videoStyle.display = 'none'

  const videoRef = React.createRef<HTMLVideoElement>()
  const canvasRef = React.createRef<HTMLCanvasElement>()

  React.useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const init = () => {
        if (props.autoPlay) video.play().then()
        initGL(video, canvas)
        video.removeEventListener('loadeddata', init)
      }
      videoRef.current.addEventListener('loadeddata', init)
    }
  }, [])

  return (
    <div className={props.className}>
      <video
        {...props}
        ref={videoRef}
        style={videoStyle}
        className={undefined}
      />
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}

function initGL(video: HTMLVideoElement, canvas: HTMLCanvasElement): void {
  const canvasRect = canvas.getBoundingClientRect()
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    width: canvasRect.width,
    height: canvasRect.height
  })

  window.addEventListener('resize', () => {
    const clientRect: DOMRect = canvas.getBoundingClientRect()
    renderer.setSize(clientRect.width, clientRect.height)
  })

  const gl = renderer.gl
  const videoTexture = new Texture(gl, {
    generateMipmaps: false,
    width: video.videoWidth,
    height: video.videoHeight
  })
  videoTexture.image = video
  videoTexture.needsUpdate = true

  gl.clearColor(0, 0, 0, 0)

  // Triangle that covers viewport, with UVs that still span 0 > 1 across viewport
  const geometry = new Geometry(gl, {
    position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
    uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
  })
  // Alternatively, you could use the Triangle class.

  const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uVideoTexture: { value: videoTexture }
    }
  })

  const mesh = new Mesh(gl, { geometry, program })

  ;(function update(): void {
    videoTexture.needsUpdate = true

    renderer.render({ scene: mesh })

    requestAnimationFrame(update)
  })()
}
