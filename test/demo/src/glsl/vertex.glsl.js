/* eslint-disable import/no-anonymous-default-export */

export const vertexShader = /* glsl */`

  precision mediump float;
  precision mediump int;

  uniform mat4 modelViewMatrix; // optional
  uniform mat4 projectionMatrix; // optional

  attribute vec3 position;
  attribute vec4 color;
  attribute vec2 uv;

  varying vec3 vPosition;
  varying vec4 vColor;
  varying vec2 vUv;

  void main()	{

    vPosition = position;
    vColor = color;
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  }

`
