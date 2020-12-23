const fragmentShader = `
precision highp float;

uniform sampler2D uVideoTexture;

varying vec2 vUv;

void main() {
    gl_FragColor = vec4(
      texture2D(uVideoTexture, vec2(vUv.x, vUv.y * 0.5 + 0.5)).rgb,
      texture2D(uVideoTexture, vec2(vUv.x, vUv.y * 0.5)).r
    );
}
`

export default fragmentShader
