# Vertex Shaders

### Syntax

```
OLD SYNTAX      MODERN SYNTAX   :   PERMISSION
uniform         uniform         :   read
attribute       in              :   read
varying         out             :   read / write
```

### Built-In Uniforms & Attributes (Three.js)

| Declaration                   | Comments                                             | Availability  |
| :---------------------------- | :--------------------------------------------------- | :------------ |
| uniform mat4 modelMatrix      | // = object.matrixWorld                              | Unconditional |
| uniform mat4 modelViewMatrix  | // = camera.matrixWorldInverse \* object.matrixWorld | Unconditional |
| uniform mat4 projectionMatrix | // = camera.projectionMatrix                         | Unconditional |
| uniform mat4 viewMatrix       | // = camera.matrixWorldInverse                       | Unconditional |
| uniform mat3 normalMatrix     | // = inverse transpose of modelViewMatrix            | Unconditional |
| uniform vec3 cameraPosition   | // = camera position in world space                  | Unconditional |
| attribute vec3 position       | // provided by BufferGeometry                        | Unconditional |
| attribute vec3 normal         | // provided by BufferGeometry                        | Unconditional |
| attribute vec2 uv             | // provided by BufferGeometry                        | Unconditional |
| attribute vec4 tangent        | // see source page                                   | Conditional   |
| attribute vec4 color          | // see source page                                   | Conditional   |
| attribute vec3 color          | // see source page                                   | Conditional   |
| attribute vec3 morphTarget0   | // see source page                                   | Conditional   |
| attribute vec3 morphTarget1   | // see source page                                   | Conditional   |
| attribute vec3 morphTarget2   | // see source page                                   | Conditional   |
| attribute vec3 morphTarget3   | // see source page                                   | Conditional   |
| attribute vec3 morphNormal0   | // see source page                                   | Conditional   |
| attribute vec3 morphNormal1   | // see source page                                   | Conditional   |
| attribute vec3 morphNormal2   | // see source page                                   | Conditional   |
| attribute vec3 morphNormal3   | // see source page                                   | Conditional   |
| attribute vec3 morphTarget4   | // see source page                                   | Conditional   |
| attribute vec3 morphTarget5   | // see source page                                   | Conditional   |
| attribute vec3 morphTarget6   | // see source page                                   | Conditional   |
| attribute vec3 morphTarget7   | // see source page                                   | Conditional   |
| attribute vec4 skinIndex      | // see source page                                   | Conditional   |
| attribute vec4 skinWeight     | // see source page                                   | Conditional   |
| attribute mat4 instanceMatrix | // see source page                                   | Conditional   |

# Fragment Shaders

### Syntax

```
OLD SYNTAX      MODERN SYNTAX   :   PERMISSION
uniform         uniform         :   read
varying         in              :   read
gl_FragColor    out             :   read / write
```

### Built-In Uniforms (Three.js)

| Declaration                 | Comments                            | Availability  |
| :-------------------------- | :---------------------------------- | :------------ |
| uniform mat4 viewMatrix     | // = camera.matrixWorldInverse      | Unconditional |
| uniform vec3 cameraPosition | // = camera position in world space | Unconditional |

# Source

https://threejs.org/docs/index.html#api/en/renderers/webgl/WebGLProgram
