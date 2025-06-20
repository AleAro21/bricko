import React, { useEffect, useRef } from 'react';

const GradientCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Get WebGL context
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported.');
      return;
    }

    // Resize canvas to fill window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Vertex Shader Source
    const vertexShaderSource = `
      attribute vec3 a_position;
      attribute vec2 a_uv;
      uniform float u_time;
      uniform float u_noiseAmp;
      uniform float u_noiseSpeed;
      uniform float u_noiseFreq;
      varying vec2 v_uv;
      varying float v_noise;

      // Simplex noise (Ashima Arts)
      vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }
      vec4 mod289(vec4 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
      }
      vec4 permute(vec4 x) {
        return mod289(((x * 34.0) + 1.0) * x);
      }
      vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
      }
      float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0);
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

        // First corner
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        // Other corners
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute( permute( permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        float n_ = 0.142857142857; // 1.0/7.0
        vec3 ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      void main() {
        v_uv = a_uv;
        float noise = snoise(vec3(a_position.xy * u_noiseFreq, u_time * u_noiseSpeed));
        v_noise = noise;
        vec3 pos = a_position;
        pos.z += noise * u_noiseAmp;
        // Add a slight tilt for a dynamic stripe look
        pos.y += sin(a_uv.x * 3.14159) * 0.1;
        gl_Position = vec4(pos, 1.0);
      }
    `;

    // Fragment Shader Source
    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_uv;
      varying float v_noise;
      uniform vec3 u_baseColor;
      uniform vec3 u_stripeColor;
      uniform float u_stripeScale;

      void main() {
        // Create a stripe pattern using the vertical coordinate and noise
        float stripes = abs(sin((v_uv.y + v_noise * 0.5) * u_stripeScale));
        float stripeMask = smoothstep(0.3, 0.7, stripes);
        vec3 gradientColor = mix(u_baseColor, u_stripeColor, stripeMask);

        // Compute a mask for the bottom-right diagonal band with smooth transition
        vec2 br = vec2(1.0, 0.0);
        vec2 diagDir = normalize(vec2(-1.0, 1.0));
        float d = dot(v_uv - br, diagDir);
        float threshold = sqrt(2.0) / 3.0;
        
        // Use smoothstep for a smooth transition
        // Adjust the range (0.08 here) to control the width of the transition
        float band = smoothstep(threshold, threshold - 0.08, d);

        // Blend between white and gradient color using the smooth band mask
        vec3 finalColor = mix(vec3(1.0), gradientColor, band);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Helper: compile shader and check for errors
    function compileShader(shaderType: number, source: string): WebGLShader | null {
      if (!gl) {
        console.error('WebGL context is not available.');
        return null;
      }
      const shader = gl.createShader(shaderType);
      if (!shader) {
        console.error('Unable to create shader.');
        return null;
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    // Create and link the shader program
    const program = gl.createProgram();
    if (!program) {
      console.error('Failed to create WebGL program.');
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Create a grid (subdivided plane) for a smoother displacement.
    const segmentsX = 50;
    const segmentsY = 50;
    const positions: number[] = [];
    const uvs: number[] = [];

    for (let y = 0; y <= segmentsY; y++) {
      for (let x = 0; x <= segmentsX; x++) {
        const u = x / segmentsX;
        const v = y / segmentsY;
        // Map positions from -1 to 1 in both x and y directions
        const posX = u * 2 - 1;
        const posY = v * 2 - 1;
        positions.push(posX, posY, 0);
        uvs.push(u, v);
      }
    }

    const indices: number[] = [];
    for (let y = 0; y < segmentsY; y++) {
      for (let x = 0; x < segmentsX; x++) {
        const i = y * (segmentsX + 1) + x;
        indices.push(i, i + 1, i + segmentsX + 1);
        indices.push(i + 1, i + segmentsX + 2, i + segmentsX + 1);
      }
    }

    // Create and bind buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const aPositionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPositionLocation);
    gl.vertexAttribPointer(aPositionLocation, 3, gl.FLOAT, false, 0, 0);

    const uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);

    const aUvLocation = gl.getAttribLocation(program, 'a_uv');
    gl.enableVertexAttribArray(aUvLocation);
    gl.vertexAttribPointer(aUvLocation, 2, gl.FLOAT, false, 0, 0);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    const uTimeLocation = gl.getUniformLocation(program, 'u_time');
    const uNoiseAmpLocation = gl.getUniformLocation(program, 'u_noiseAmp');
    const uNoiseSpeedLocation = gl.getUniformLocation(program, 'u_noiseSpeed');
    const uNoiseFreqLocation = gl.getUniformLocation(program, 'u_noiseFreq');
    const uBaseColorLocation = gl.getUniformLocation(program, 'u_baseColor');
    const uStripeColorLocation = gl.getUniformLocation(program, 'u_stripeColor');
    const uStripeScaleLocation = gl.getUniformLocation(program, 'u_stripeScale');

    // Calmer noise parameters:
    gl.uniform1f(uNoiseAmpLocation, 1); 
    gl.uniform1f(uNoiseSpeedLocation, 0.2);  
    gl.uniform1f(uNoiseFreqLocation, 2.0);    

    // Base color: #f95940 normalized
    gl.uniform3fv(uBaseColorLocation, [4/255, 122/255, 255/255]);
    // Stripe color: #3d9bff normalized with slight white blend
    gl.uniform3fv(uStripeColorLocation, [61/255, 155/255, 255/255]);
   
    // Stripe scale: adjust to control frequency
    gl.uniform1f(uStripeScaleLocation, 2.0);

    let startTime = performance.now();

    // Animation loop
    const render = () => {
      gl.useProgram(program);
      const currentTime = performance.now();
      const elapsed = (currentTime - startTime) / 1000.0;

      // Pass elapsed time to the shader
      if (uTimeLocation) {
        gl.uniform1f(uTimeLocation, elapsed);
      }

      // Clear to white so that any areas not overwritten by the fragment shader remain white.
      gl.clearColor(1.0, 1.0, 1.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        opacity: 0.8,
        pointerEvents: 'none',
      }}
    />
  );
};

export default GradientCanvas;