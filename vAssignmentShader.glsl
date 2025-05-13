#version 330 core

layout (location = 0) in vec4 vPosition;
layout (location = 2) in vec4 vNormal;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

out vec3 fNormal;
out vec3 fPos;

void main() {
    vec4 worldPos = modelMatrix * vPosition;
    fPos = vec3(worldPos); 

    // Transformiere die Normalen in den Weltkoordinatenraum
    fNormal = normalize(mat3(transpose(inverse(modelMatrix))) * vec3(vNormal));
    
    // Berechne die endgültige Position für den Clip-Raum
    gl_Position = projectionMatrix * viewMatrix * worldPos;
}
