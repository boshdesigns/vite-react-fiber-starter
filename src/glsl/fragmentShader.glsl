uniform float uTime;
uniform vec2 uResolution;
uniform float uDissolveProgress; // New uniform for linear dissolve

float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord.xy / uResolution.xy;
    
    float resolution = 5.0;
    vec2 lowresxy = vec2(
        floor(fragCoord.x / resolution),
        floor(fragCoord.y / resolution)
    );
    
    if (uDissolveProgress < rand(lowresxy)) {
        gl_FragColor = vec4(uv, 0.5 + 0.5 * sin(5.0 * fragCoord.x), 0);
    } else {
        gl_FragColor = vec4(0.9294117647058824, 0.4235294117647059, 0, 1.0);
    }
}
