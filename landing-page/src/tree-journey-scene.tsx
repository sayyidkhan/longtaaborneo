import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type TreeJourneySceneProps = {
  progress: number;
  onReady: () => void;
};

const MODEL_ROOT = "/models/kenney";

function fitObject(object: THREE.Object3D, targetHeight: number) {
  const initialBox = new THREE.Box3().setFromObject(object);
  const height = Math.max(initialBox.getSize(new THREE.Vector3()).y, 0.001);
  object.scale.setScalar(targetHeight / height);
  const fittedBox = new THREE.Box3().setFromObject(object);
  object.position.y -= fittedBox.min.y;
  return object;
}

function makeLimb(
  parent: THREE.Object3D,
  from: THREE.Vector3,
  to: THREE.Vector3,
  startRadius: number,
  endRadius: number,
  material: THREE.Material,
) {
  const midpoint = from.clone().add(to).multiplyScalar(0.5);
  const direction = to.clone().sub(from);
  const limb = new THREE.Mesh(
    new THREE.CylinderGeometry(endRadius, startRadius, direction.length(), 9, 1),
    material,
  );
  limb.position.copy(midpoint);
  limb.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  limb.castShadow = true;
  parent.add(limb);
  return limb;
}

function makeLonghouse(scene: THREE.Scene, module: THREE.Object3D | null) {
  const house = new THREE.Group();
  house.position.set(4, 0, -9);
  scene.add(house);

  const timber = new THREE.MeshStandardMaterial({ color: 0x6d4528, roughness: 0.94 });
  const timberDark = new THREE.MeshStandardMaterial({ color: 0x281a12, roughness: 1 });
  const roof = new THREE.MeshStandardMaterial({ color: 0x19241b, roughness: 0.9, side: THREE.DoubleSide });
  const warm = new THREE.MeshStandardMaterial({
    color: 0xffd59b,
    emissive: 0xff8a2f,
    emissiveIntensity: 2.1,
    roughness: 0.75,
  });

  const box = (
    size: [number, number, number],
    position: [number, number, number],
    material: THREE.Material,
    rotation: [number, number, number] = [0, 0, 0],
  ) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    house.add(mesh);
    return mesh;
  };

  box([12.4, 0.38, 7.2], [0, 1.05, 0], timberDark);
  [-5.4, -3.6, -1.8, 0, 1.8, 3.6, 5.4].forEach((x) => {
    box([0.22, 1.15, 0.22], [x, 0.48, -2.6], timberDark);
    box([0.22, 1.15, 0.22], [x, 0.48, 2.6], timberDark);
  });
  box([12.4, 4.1, 0.32], [0, 3.25, -3.45], timber);
  box([4.35, 4.1, 0.32], [-4, 3.25, 3.45], timber);
  box([4.35, 4.1, 0.32], [4, 3.25, 3.45], timber);
  box([3.7, 0.78, 0.32], [0, 4.9, 3.45], timber);
  box([0.32, 4.1, 7.2], [-6.05, 3.25, 0], timber);
  box([0.32, 4.1, 7.2], [6.05, 3.25, 0], timber);
  box([6.9, 0.32, 4.7], [-2.8, 5.85, 0], roof, [0, 0, -0.43]);
  box([6.9, 0.32, 4.7], [2.8, 5.85, 0], roof, [0, 0, 0.43]);
  box([3.1, 3.45, 0.08], [0, 2.8, 3.25], warm);
  [-5.35, -4.25, -3.15, -2.05, 2.05, 3.15, 4.25, 5.35].forEach((x) =>
    box([0.13, 4.1, 0.18], [x, 3.25, 3.64], timberDark),
  );

  if (module) {
    [-3.9, 0, 3.9].forEach((x, index) => {
      const bay = fitObject(module.clone(true), 2.5);
      bay.position.set(x - 1.25, 1.24, -2.95);
      bay.rotation.y = Math.PI + (index - 1) * 0.025;
      bay.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      house.add(bay);
    });
  }

  return house;
}

export function TreeJourneyScene({ progress, onReady }: TreeJourneySceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let frame = 0;
    let disposed = false;
    let currentProgress = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06150e);
    const fog = new THREE.Fog(0x06150e, 11, 50);
    scene.fog = fog;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    } catch {
      canvas.dataset.failed = "true";
      onReadyRef.current();
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = window.innerWidth < 780 ? 1.24 : 1.02;
    renderer.shadowMap.enabled = window.innerWidth >= 780;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 130);
    const ambient = new THREE.HemisphereLight(0x97cfa8, 0x1d160f, window.innerWidth < 780 ? 1.9 : 1.5);
    scene.add(ambient);
    const moon = new THREE.DirectionalLight(0xdfffd0, 2.9);
    moon.position.set(-11, 24, 12);
    moon.castShadow = true;
    moon.shadow.mapSize.set(1024, 1024);
    scene.add(moon);
    const doorLight = new THREE.PointLight(0xffad55, 6, 24, 2);
    doorLight.position.set(4, 3.2, -5.6);
    scene.add(doorLight);

    const world = new THREE.Group();
    scene.add(world);
    const bark = new THREE.MeshStandardMaterial({ color: 0x4c301d, roughness: 0.96 });
    const rootMaterial = new THREE.MeshStandardMaterial({ color: 0x322216, roughness: 1 });
    const markerMaterial = new THREE.MeshStandardMaterial({
      color: 0xb8e04d,
      emissive: 0x6e9f20,
      emissiveIntensity: 0.7,
      roughness: 0.58,
    });
    const markers: THREE.Mesh[] = [];

    const branchData = [
      { y: 22.4, side: 1, z: 0.3 },
      { y: 18.2, side: -1, z: 0.6 },
      { y: 14.1, side: 1, z: -0.3 },
      { y: 10.1, side: -1, z: 0.5 },
      { y: 6.4, side: 1, z: -0.5 },
    ];
    branchData.forEach(({ y, side, z }) => {
      const start = new THREE.Vector3(side * 0.45, y, z);
      const elbow = new THREE.Vector3(side * 4.2, y + 0.35, z + 0.4);
      const end = new THREE.Vector3(side * 7.4, y - 0.75, z + 1.5);
      makeLimb(world, start, elbow, 0.52, 0.3, bark);
      makeLimb(world, elbow, end, 0.3, 0.08, bark);
      const marker = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 1), markerMaterial.clone());
      marker.position.copy(end);
      marker.userData.stage = y > 20 ? 0.2 : y > 16 ? 0.36 : y > 12 ? 0.54 : y > 8 ? 0.7 : 0.82;
      scene.add(marker);
      markers.push(marker);
    });

    const canopyAnchors = [
      new THREE.Vector3(0, 26.5, 0),
      new THREE.Vector3(-4.4, 25.3, 0.8),
      new THREE.Vector3(4.6, 25, -0.5),
      new THREE.Vector3(-7.2, 22.6, 1.7),
      new THREE.Vector3(7.1, 22.1, 1.2),
      new THREE.Vector3(-5.7, 18.1, 0.8),
      new THREE.Vector3(5.9, 14.2, 0),
      new THREE.Vector3(-5.2, 10.2, 1.1),
    ];
    const leafCount = window.innerWidth < 780 ? 104 : 168;
    const leafGeometry = new THREE.IcosahedronGeometry(0.72, 1);
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x2f7a45, roughness: 0.9, flatShading: true });
    const canopy = new THREE.InstancedMesh(leafGeometry, leafMaterial, leafCount);
    const leafDummy = new THREE.Object3D();
    const leafColors = [new THREE.Color(0x1d6339), new THREE.Color(0x2f7a45), new THREE.Color(0x70a23e)];
    for (let i = 0; i < leafCount; i += 1) {
      const anchor = canopyAnchors[i % canopyAnchors.length];
      const phase = i * 12.9898;
      const randomA = ((Math.sin(phase) + 1) * 0.5) % 1;
      const randomB = ((Math.sin(phase * 1.73 + 2.1) + 1) * 0.5) % 1;
      const randomC = ((Math.sin(phase * 2.37 + 4.8) + 1) * 0.5) % 1;
      leafDummy.position.set(
        anchor.x + (randomA - 0.5) * 5.3,
        anchor.y + (randomB - 0.5) * 3.4,
        anchor.z + (randomC - 0.5) * 4.6,
      );
      const scale = 0.78 + randomC * 0.95;
      leafDummy.scale.set(scale * 1.14, scale, scale * 0.88);
      leafDummy.rotation.set(randomA * 0.7, randomB * Math.PI, randomC * 0.55);
      leafDummy.updateMatrix();
      canopy.setMatrixAt(i, leafDummy.matrix);
      canopy.setColorAt(i, leafColors[i % leafColors.length]);
    }
    canopy.instanceMatrix.needsUpdate = true;
    if (canopy.instanceColor) canopy.instanceColor.needsUpdate = true;
    canopy.castShadow = window.innerWidth >= 780;
    world.add(canopy);

    [
      [-8, -0.28, 3.6],
      [8.3, -0.3, 3.2],
      [-7.2, -0.3, -3],
      [7.8, -0.28, -3.2],
      [0, -0.32, 7.2],
    ].forEach(([x, y, z]) => {
      const elbow = new THREE.Vector3(x * 0.48, 0.2, z * 0.45);
      makeLimb(world, new THREE.Vector3(0, 0.45, 0), elbow, 0.8, 0.38, rootMaterial);
      makeLimb(world, elbow, new THREE.Vector3(x, y, z), 0.38, 0.08, rootMaterial);
    });

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(36, 64),
      new THREE.MeshStandardMaterial({ color: 0x0a2819, roughness: 1 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.42;
    ground.receiveShadow = true;
    scene.add(ground);

    const fireflyCount = window.innerWidth < 780 ? 65 : 120;
    const fireflyPositions = new Float32Array(fireflyCount * 3);
    for (let i = 0; i < fireflyCount; i += 1) {
      const random = (seed: number) => ((Math.sin(seed * 492.37) + 1) * 0.5) % 1;
      fireflyPositions[i * 3] = (random(i + 3) - 0.5) * 26;
      fireflyPositions[i * 3 + 1] = random(i + 19) * 29;
      fireflyPositions[i * 3 + 2] = (random(i + 41) - 0.5) * 18;
    }
    const fireflyGeometry = new THREE.BufferGeometry();
    fireflyGeometry.setAttribute("position", new THREE.BufferAttribute(fireflyPositions, 3));
    const fireflies = new THREE.Points(
      fireflyGeometry,
      new THREE.PointsMaterial({ color: 0xd6f67c, size: 0.055, transparent: true, opacity: 0.75, depthWrite: false }),
    );
    scene.add(fireflies);

    const loader = new GLTFLoader();
    const loadModel = (name: string) =>
      new Promise<THREE.Object3D>((resolve, reject) => {
        loader.load(`${MODEL_ROOT}/${name}`, (gltf) => resolve(gltf.scene), undefined, reject);
      });
    const colorizeTree = (object: THREE.Object3D) => {
      object.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        const recolored = materials.map((source) => {
          const material = source.clone() as THREE.MeshStandardMaterial;
          const name = material.name.toLowerCase();
          if (name.includes("leaf")) material.color.setHex(0x2f7a45);
          else if (name.includes("bark") || name.includes("wood")) material.color.setHex(0x56351f);
          else material.color.setHex(0x335b38);
          material.roughness = 0.92;
          material.flatShading = true;
          material.needsUpdate = true;
          return material;
        });
        child.material = Array.isArray(child.material) ? recolored : recolored[0];
      });
      return object;
    };

    Promise.allSettled([
      loadModel("tree-oak.glb"),
      loadModel("tree-oak.glb"),
      loadModel("structure.glb"),
    ]).then(([treeResult, oakResult, structureResult]) => {
      if (disposed) return;
      if (treeResult.status === "fulfilled") {
        const tree = fitObject(colorizeTree(treeResult.value), 27.5);
        tree.rotation.y = -0.35;
        tree.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        world.add(tree);
      } else {
        makeLimb(world, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 27, 0), 1.75, 0.52, bark);
      }

      if (oakResult.status === "fulfilled") {
        const oak = colorizeTree(oakResult.value);
        const placements: Array<[number, number, number, number]> = [
          [-11, -1, -5, 10],
          [11, -1, -7, 12],
          [-14, -1, 5, 8],
          [15, -1, 4, 9],
          [-8, -1, -12, 7],
          [15, -1, -15, 8],
        ];
        placements.forEach(([x, y, z, height], index) => {
          const tree = fitObject(oak.clone(true), height);
          tree.position.add(new THREE.Vector3(x, y, z));
          tree.rotation.y = index * 0.83;
          world.add(tree);
        });
      }

      makeLonghouse(scene, structureResult.status === "fulfilled" ? structureResult.value : null);
      onReadyRef.current();
    });

    const cameraCurve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 30, 30),
        new THREE.Vector3(7.5, 25.1, 26),
        new THREE.Vector3(-7.5, 20.3, 24),
        new THREE.Vector3(7.4, 15.2, 22),
        new THREE.Vector3(-6.8, 10.2, 20),
        new THREE.Vector3(5.2, 5.4, 18),
        new THREE.Vector3(4, 3.15, 8.5),
        new THREE.Vector3(4, 2.85, 1),
        new THREE.Vector3(4, 2.8, -12.6),
      ],
      false,
      "catmullrom",
      0.45,
    );
    const targetCurve = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 24, 0),
        new THREE.Vector3(0, 21, 0),
        new THREE.Vector3(0, 17, 0),
        new THREE.Vector3(0, 13, 0),
        new THREE.Vector3(0, 8, 0),
        new THREE.Vector3(1.2, 3.2, -2),
        new THREE.Vector3(4, 3, -7),
        new THREE.Vector3(4, 2.8, -9.7),
        new THREE.Vector3(4, 2.8, -15),
      ],
      false,
      "catmullrom",
      0.45,
    );

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 780 ? 1.2 : 1.5));
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const render = () => {
      frame = window.requestAnimationFrame(render);
      currentProgress = reducedMotion
        ? progressRef.current
        : THREE.MathUtils.lerp(currentProgress, progressRef.current, 0.065);
      const t = THREE.MathUtils.clamp(currentProgress, 0, 1);
      camera.position.copy(cameraCurve.getPoint(t));
      if (window.innerWidth < 780 && t < 0.78) camera.position.x += t < 0.5 ? 1.35 : -1.05;
      camera.lookAt(targetCurve.getPoint(t));
      markers.forEach((marker) => {
        const proximity = Math.max(0, 1 - Math.abs(currentProgress - Number(marker.userData.stage)) * 11);
        const material = marker.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.55 + proximity * 3.1;
        marker.scale.setScalar(0.88 + proximity * 0.5);
      });
      canopy.rotation.y = currentProgress * 0.055;
      doorLight.intensity = 5 + THREE.MathUtils.smoothstep(currentProgress, 0.76, 0.96) * 15;
      fog.near = 12 - THREE.MathUtils.smoothstep(currentProgress, 0.82, 1) * 6;
      fog.far = 50 - THREE.MathUtils.smoothstep(currentProgress, 0.82, 1) * 23;
      renderer.render(scene, camera);
    };
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      fireflyGeometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="tree-world-canvas" aria-hidden="true" />;
}
