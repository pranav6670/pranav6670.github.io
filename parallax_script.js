"use strict";

class MathUtils {
  constructor() {}

  lerp(a, b, n) {
    return n * (b - a) + a;
  }
}

const main = () => {
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl");
  const mathUtils = new MathUtils();
  const mouse = { x: 0, y: 0 };
  const lastmouse = [0, 0];
  if (!gl) {
    return;
  }

  twgl.setDefaults({
    textureColor: [0, 0, 0, 0]
  });
  // replaced after loading
  let srcs = {
    text: { width: 1, height: 1 }
  };
  const textures = twgl.createTextures(
    gl,
    {
      text: { src: "https://i.ibb.co/9WvFgbZ/fancycrave-165873-unsplash.jpg" },
      map: { src: "https://i.ibb.co/N7R9v8p/map3.jpg" },
      blur: { src: "https://i.ibb.co/cy79kN4/blur.jpg" }
    },
    (err, textures, sources) => {
      srcs = sources;
    }
  );

  // compile shaders, link program, lookup location
  const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

  // calls gl.createBuffer, gl.bindBuffer, gl.bufferData for a quad
  const bufferInfo = twgl.primitives.createXYQuadBufferInfo(gl);

  let uniforms = {
    u_text: textures.text,
    u_map: textures.map,
    u_blur: textures.blur,
    u_res: [gl.canvas.clientWidth, gl.canvas.clientHeight]
  };

  const render = time => {
    time *= 0.001; // seconds

    twgl.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(programInfo.program);

    // calls gl.bindBuffer, gl.enableVertexAttribArray, gl.vertexAttribPointer
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);

    const canvasAspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const imageAspect = srcs.text.width / srcs.text.height;
    let mat = m3.scaling(imageAspect / canvasAspect, -1);

    // this assumes we want to fill vertically
    let horizontalDrawAspect = imageAspect / canvasAspect;
    let verticalDrawAspect = -1;
    // does it fill horizontally?
    if (horizontalDrawAspect < 1) {
      // no it does not so scale so we fill horizontally and
      // adjust vertical to match
      verticalDrawAspect /= horizontalDrawAspect;
      horizontalDrawAspect = 1;
    }
    mat = m3.scaling(horizontalDrawAspect, verticalDrawAspect);

    uniforms.u_matrix = mat;
    uniforms.u_time = time * 10;
    uniforms.u_mouse = lastmouse;

    // calls gl.activeTexture, gl.bindTexture, gl.uniformXXX
    twgl.setUniforms(programInfo, uniforms);

    // calls gl.drawArrays or gl.drawElements
    twgl.drawBufferInfo(gl, bufferInfo);

    lastmouse[0] = mathUtils.lerp(lastmouse[0], mouse.x, 0.1);
    lastmouse[1] = mathUtils.lerp(lastmouse[1], mouse.y, 0.1);

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);

  canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
    mouse.x = -clientX / innerWidth;
    mouse.y = -clientY / innerHeight;
  });
};

main();