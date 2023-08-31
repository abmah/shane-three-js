uniform sampler2D uAlphaTexture;
uniform vec3 uColor;

void main()
{
    float alphaValue = texture2D(uAlphaTexture, gl_PointCoord).a;

    gl_FragColor = vec4(uColor, alphaValue);
}


// uniform vec3 uColor;

// void main()
// {
//     float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
//     float strength = 0.05 / distanceToCenter - 0.1;

//     gl_FragColor = vec4(uColor, strength);
// }