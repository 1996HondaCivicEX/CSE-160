class Sphere{
    constructor(){
        this.type = 'sphere';
        this.color = [1.0,1.0,1.0,1.0];
        this.matrix = new Matrix4();
        this.textureNum = -2;
        this.verts32 = new Float32Array([]);
    }

    render(){
        var rgba = this.color;
        gl.uniform1i(u_whichTexture, this.textureNum);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        var d = Math.PI/10;
        var dd = Math.PI/10; 

        for (var t = 0; t < Math.PI; t += d) {
            for (var r = 0; r < 2 * Math.PI; r += d) {

                // Four corners of a patch on the sphere surface
                var p1 = [Math.sin(t)*Math.cos(r),       Math.sin(t)*Math.sin(r),       Math.cos(t)      ];
                var p2 = [Math.sin(t+dd)*Math.cos(r),    Math.sin(t+dd)*Math.sin(r),    Math.cos(t+dd)   ];
                var p3 = [Math.sin(t)*Math.cos(r+dd),    Math.sin(t)*Math.sin(r+dd),    Math.cos(t)      ];
                var p4 = [Math.sin(t+dd)*Math.cos(r+dd), Math.sin(t+dd)*Math.sin(r+dd), Math.cos(t+dd)  ];

                // First triangle: p1, p2, p4
                var verts = [];
                var uvs = [];
                verts = verts.concat(p1); uvs = uvs.concat([0, 0]);
                verts = verts.concat(p2); uvs = uvs.concat([0, 0]);
                verts = verts.concat(p4); uvs = uvs.concat([0, 0]);
                gl.uniform4f(u_FragColor, 1, 1, 1, 1);
                drawTriangle3DUVNormal(verts, uvs, verts); // normals = positions on unit sphere

                // Second triangle: p1, p4, p3
                verts = [];
                uvs = [];
                verts = verts.concat(p1); uvs = uvs.concat([0, 0]);
                verts = verts.concat(p4); uvs = uvs.concat([0, 0]);
                verts = verts.concat(p3); uvs = uvs.concat([0, 0]);
                gl.uniform4f(u_FragColor, 1, 1, 1, 1);
                drawTriangle3DUVNormal(verts, uvs, verts); // normals = positions on unit sphere
            }
        }
    }
}