#ifdef GL_ES
precision highp float;
#endif

uniform vec3 uResolution;
uniform float uTime;
uniform sampler2D uChannel0;
uniform sampler2D uChannel1;
in vec2 vUv;
out vec4 fragColor;

// Based on: https://www.shadertoy.com/view/4sXSzs
void main() {
  vec2 p = gl_FragCoord.xy / uResolution.xy;
  vec2 q = p - vec2(0.5, 0.5);

  q.x += sin(uTime * 0.6) * 0.2;
  q.y += cos(uTime * 0.4) * 0.3;

  float len = length(q);

  float a = atan(q.y, q.x) + uTime * 0.3;
  float b = atan(q.y, q.x) + uTime * 0.3;
  float r1 = 0.3 / len + uTime * 0.5;
  float r2 = 0.2 / len + uTime * 0.5;

  float m = (1.0 + sin(uTime * 0.5)) / 2.0;
  vec4 tex1 = texture(uChannel0, vec2(a + 0.1 / len, r1));
  vec4 tex2 = texture(uChannel1, vec2(b + 0.1 / len, r2));
  vec3 col = vec3(mix(tex1, tex2, m));
  fragColor = vec4(col * len * 1.5, 1.0);
}
