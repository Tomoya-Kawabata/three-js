window.addEventListener('load',init);

function init(){
    const width = 1000;
    const height =500;
    let rotate = 0;

    const scene = new THREE.Scene();

    const camere = new THREE.PerspectiveCamera(80, width/height);


    const renderer = new THREE.WebGLRenderer({
        canvas : document.querySelector('#canvas'),
    });
    renderer.setSize(window.innerWidth,window.innerHeight);

    const geometry = new THREE.SphereGeometry(300,30,30);

    const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load('imgs/earth.jpg'),
    });

    const earth = new THREE.Mesh(geometry,material);
    scene.add(earth);


    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.9 );

    directionalLight.position.set( 1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight( 0xffffff , 2, 1000);
    scene.add(pointLight);

    const pointLightHelper = new THREE.PointLightHelper(pointLight , 30);
    scene.add(pointLightHelper);




    starsCreat();

    function starsCreat(){
        const values = [];
        for(let i = 0 ; i < 500 ; i++){
            const x = 3000 * (Math.random() - 0.5);
            const y = 3000 * (Math.random() - 0.5);
            const z = 3000 * (Math.random() - 0.5);

            values.push(x,y,z);
        }

        const geometory = new THREE.BufferGeometry();
        geometory.setAttribute(
            'position', new THREE.Float32BufferAttribute(values,3)
        );

        const material = new THREE.PointsMaterial({
            size : 8,
            color : 0xffffff,
        });

        const stars = new THREE.Points(geometory,material);
        scene.add(stars);
    }

    function tick(){
        rotate += 0.5 ;

        const radian = (rotate * Math.PI) / 100;

        camere.position.x = 1000 * Math.sin(radian);
        camere.position.z = 1000 * Math.cos(radian);

        camere.lookAt(new THREE.Vector3(0, 0, 400))

        pointLight.position.set(
            500 * Math.sin(Date.now() / 500),
            500 * Math.sin(Date.now() / 1000),
            500 * Math.cos(Date.now() / 500),
        );

        renderer.render(scene, camere);
        requestAnimationFrame(tick);
    }
    tick();



}