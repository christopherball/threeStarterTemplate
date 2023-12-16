#ifdef GL_ES
precision highp float;
#endif

// Showcasing import of a function from a 3rd-party library thanks to parcel functionality.
#pragma glslify: random = require('glsl-random')

uniform float uTime;
uniform vec3 uResolution;
uniform float uRandomNum;
in vec2 vUv;
out vec4 fragColor;

void main() {
  // Showcases constant animated noise
  // vec2 randSeedUv = mod(gl_FragCoord.xy + uTime, uResolution.xy) / uResolution.xy;

  // Showcases single snapshot of noise per page load
  vec2 randSeedUv = mod(gl_FragCoord.xy + uRandomNum, uResolution.xy) / uResolution.xy;

  // Applying rounding to ensure pure black and white noise (no shades of grey)
  fragColor = vec4(vec3(round(random(randSeedUv))), 1.0);
}
