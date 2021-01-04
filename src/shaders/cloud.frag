#pragma glslify: fbm3d = require('glsl-fractal-brownian-noise/3d')
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: levels = require('./levels')


uniform sampler2D uTxtShape;
uniform sampler2D uTxtCloudNoise;
uniform float uTime;

uniform float uFac1;
uniform float uFac2;
uniform float uTimeFactor1;
uniform float uTimeFactor2;
uniform float uDisplStrenght1;
uniform float uDisplStrenght2;
uniform vec3 uColor;

varying vec2 vUv;

void main() {
    vec2 newUv = vUv;

    vec4 txtNoise = texture2D(uTxtCloudNoise, vUv); // noise txt

    float noiseBig = fbm3d(vec3(vUv * uFac1, uTime * uTimeFactor1), 5)+ 1.0 * 0.5;
    newUv += noiseBig * uDisplStrenght1;

    float noiseSmall = snoise3(vec3(newUv * uFac2, uTime * uTimeFactor2 ));

    newUv += noiseSmall * uDisplStrenght2;

    vec4 txtShape = texture2D(uTxtShape, newUv);

    float alpha = levels(txtNoise * 0.9, 0.2, 0.8, 0.7).r;
    alpha *= txtShape.r;

    gl_FragColor = vec4(uColor, alpha);
}
