#ifdef GL_ES
precision highp float;
#endif

uniform vec3 uResolution;
uniform float uTime;
in vec2 vUv;
out vec4 fragColor;

// Based on: https://www.shadertoy.com/view/clfGW8
void main() {
  vec4 O = vec4(0.0);
  vec2 F = gl_FragCoord.xy;

  vec2 r = uResolution.xy;
  float i = .3, l = length(F += F - r) / r.y + i, t = uTime;

  for (O *= 0.; i < 12.; O += length(min(r.y / abs(F), r)) / 3e2 * (cos(++t + i + vec4(0, 1, 2, 0)) * l + l)) {
    F *= mat2(cos(l * .2 - i++ * --t / 1e2 + vec4(0, 33, 11, 0)));
  }
  fragColor = O;
}
