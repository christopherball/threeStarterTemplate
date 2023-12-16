#ifdef GL_ES
precision highp float;
#endif

uniform vec3 uResolution;
uniform sampler2D uState;
uniform bool uPresent;
in vec2 vUv;
out vec4 fragColor;

void main() {
  float current = texture(uState, vec2(vUv.x, vUv.y)).r;

  if (uPresent) {
    fragColor = vec4(current, current, current, 1.);
  } else {
    int sum = 0;
    sum += int(texture(uState, vec2((gl_FragCoord.x + 1.0) / uResolution.x, (gl_FragCoord.y + 1.0) / uResolution.y)).r);
    sum += int(texture(uState, vec2((gl_FragCoord.x + 1.0) / uResolution.x, (gl_FragCoord.y) / uResolution.y)).r);
    sum += int(texture(uState, vec2((gl_FragCoord.x + 1.0) / uResolution.x, (gl_FragCoord.y - 1.0) / uResolution.y)).r);
    sum += int(texture(uState, vec2((gl_FragCoord.x) / uResolution.x, (gl_FragCoord.y - 1.0) / uResolution.y)).r);
    sum += int(texture(uState, vec2((gl_FragCoord.x - 1.0) / uResolution.x, (gl_FragCoord.y - 1.0) / uResolution.y)).r);
    sum += int(texture(uState, vec2((gl_FragCoord.x - 1.0) / uResolution.x, (gl_FragCoord.y) / uResolution.y)).r);
    sum += int(texture(uState, vec2((gl_FragCoord.x - 1.0) / uResolution.x, (gl_FragCoord.y + 1.0) / uResolution.y)).r);
    sum += int(texture(uState, vec2((gl_FragCoord.x) / uResolution.x, (gl_FragCoord.y + 1.0) / uResolution.y)).r);

    if (current == 1. && (sum < 2 || sum > 3))
      fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    else if (current == 1. && (sum == 2 || sum == 3))
      fragColor = vec4(1.0, 1.0, 1.0, 1.0);
    else if (current == 0. && sum == 3)
      fragColor = vec4(1.0, 1.0, 1.0, 1.0);
    else
      fragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
}