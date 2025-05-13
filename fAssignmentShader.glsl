#version 330 core

in vec3 fNormal;
in vec3 fPos;

struct Material {
    vec3 Ka;
    vec3 Kd;
    vec3 Ks;
    float shininess;
    float opacity;
}; 

uniform Material material;

struct PointLight {
    vec3 pos;
    float a;
    float b;
    float c;
};

struct Light {
    bool enabled;
    vec3 Ia;
    vec3 Id;
    vec3 Is;
    PointLight pointLight;
};

//LightManager
uniform vec3 globalAmbientLight;
uniform int numLights;
uniform Light lights[8];
uniform vec3 cameraPos;

out vec4 colorOut;

void main() {
    vec3 ambientGlobal = globalAmbientLight * material.Ka;
    vec3 normal = normalize(fNormal);
    vec3 viewDir = normalize(cameraPos - fPos);
    vec3 colorRed = vec3(1.0, 0.0, 0.0);

    vec3 ambient = vec3(0.0);
    vec3 diffuse = vec3(0.0);
    vec3 specular = vec3(0.0);

    for (int i = 0; i < numLights; ++i) {
        vec3 lightDir = normalize(lights[i].pointLight.pos - fPos);
        float dist = length(lights[i].pointLight.pos - fPos);
        float attenuation = 1.0 / (lights[i].pointLight.a + lights[i].pointLight.b * dist + lights[i].pointLight.c * dist * dist);
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(normal, halfDir), 0.0), material.shininess);

        ambient  += lights[i].Ia * material.Ka;
        specular += lights[i].Is * material.Ks * spec * attenuation;
        
        // aqui va el if para ver si usamos rojo o no al calcular el difuso-----------
        if (fPos.y > 0) {
            // si esta arriba (y positivo) normal
            diffuse  += lights[i].Id * material.Kd * diff * attenuation; 
        } else {
            // si esta debajo (y negativa) rojo
            diffuse  += lights[i].Id * colorRed * diff * attenuation;
        }
        // -------------------------------------------

    }
    
    vec3 finalColor = ambientGlobal + ambient + diffuse + specular;

    // -------- Borde suave blanco (difuminado) --------
    float cosAlpha = dot(normal, viewDir);
    float silhouetteFactor = pow(1.0 - abs(cosAlpha), 2.0); // Ajusta el '2.0' para controlar grosor
    vec3 silhouetteColor = vec3(1.0); // color del borde (blanco)

    finalColor = mix(finalColor, silhouetteColor, silhouetteFactor);
    // -------------------------------------------

    colorOut = vec4(finalColor, 1.0);
}
