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

function makeHornbill(scene: THREE.Scene) {
  const bird = new THREE.Group();
  bird.name = "hornbill-guide";

  const black = new THREE.MeshStandardMaterial({
    color: 0x18271f,
    emissive: 0x07140d,
    emissiveIntensity: 0.48,
    roughness: 0.72,
  });
  const white = new THREE.MeshStandardMaterial({ color: 0xe9e5d6, roughness: 0.82 });
  const beak = new THREE.MeshStandardMaterial({
    color: 0xf0ad2e,
    emissive: 0x7c3608,
    emissiveIntensity: 0.28,
    roughness: 0.65,
  });
  const eye = new THREE.MeshBasicMaterial({ color: 0xf8f3df });
  const pupil = new THREE.MeshBasicMaterial({ color: 0x050706 });

  const addPart = (
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    position: [number, number, number],
    scale: [number, number, number] = [1, 1, 1],
  ) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    bird.add(mesh);
    return mesh;
  };

  addPart(new THREE.SphereGeometry(0.7, 10, 7), black, [0, 0, 0], [0.72, 0.58, 1.18]);
  addPart(new THREE.SphereGeometry(0.48, 9, 6), black, [0, 0.35, 0.83]);
  addPart(new THREE.SphereGeometry(0.44, 9, 6), white, [0, -0.22, 0.33], [0.72, 0.58, 1]);

  const bill = addPart(new THREE.ConeGeometry(0.25, 1.05, 7), beak, [0, 0.28, 1.55]);
  bill.rotation.x = Math.PI / 2;
  const casque = addPart(new THREE.BoxGeometry(0.3, 0.24, 0.7), beak, [0, 0.58, 1.36]);
  casque.rotation.x = -0.12;

  [-1, 1].forEach((side) => {
    addPart(new THREE.SphereGeometry(0.09, 7, 5), eye, [side * 0.42, 0.48, 0.97]);
    addPart(new THREE.SphereGeometry(0.045, 7, 5), pupil, [side * 0.475, 0.49, 0.99]);
  });

  [-0.24, 0, 0.24].forEach((x, index) => {
    const feather = addPart(
      new THREE.BoxGeometry(0.18, 0.12, 1.05),
      index === 1 ? white : black,
      [x, -0.08, -1.03],
    );
    feather.rotation.x = index === 1 ? -0.04 : 0.04;
  });

  const wingMeshes: THREE.Mesh[] = [];
  const wings = [-1, 1].map((side) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.35, 0.08, 0.02);
    const wing = new THREE.Mesh(new THREE.SphereGeometry(0.75, 8, 5), black);
    wing.position.set(side * 0.58, 0, -0.08);
    wing.scale.set(0.95, 0.13, 0.5);
    wingMeshes.push(wing);
    pivot.add(wing);
    bird.add(pivot);
    return pivot;
  });

  bird.traverse((part) => {
    if (!(part instanceof THREE.Mesh)) return;
    part.castShadow = true;
    part.renderOrder = 4;
    const materials = Array.isArray(part.material) ? part.material : [part.material];
    materials.forEach((material) => {
      material.depthTest = false;
      material.depthWrite = false;
    });
  });
  scene.add(bird);
  return { bird, leftWing: wings[0], rightWing: wings[1], wingMeshes };
}

function makeLonghouse(scene: THREE.Scene) {
  const house = new THREE.Group();
  house.position.set(3.5, 0, -11);
  scene.add(house);

  const timber = new THREE.MeshStandardMaterial({ color: 0xa39478, roughness: 1 });
  const timberLight = new THREE.MeshStandardMaterial({ color: 0xc0b79f, roughness: 1 });
  const timberDark = new THREE.MeshStandardMaterial({ color: 0x332b23, roughness: 1 });
  const carvedWood = new THREE.MeshStandardMaterial({ color: 0x756a56, roughness: 1 });
  const bamboo = new THREE.MeshStandardMaterial({ color: 0x9b8866, roughness: 0.96 });
  const roof = new THREE.MeshStandardMaterial({ color: 0x403a31, roughness: 1, side: THREE.DoubleSide });
  const warm = new THREE.MeshStandardMaterial({
    color: 0xffd49a,
    emissive: 0xff8e3b,
    emissiveIntensity: 1.8,
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

  // A long raised floor and regular stilts establish the longhouse silhouette.
  box([15.8, 0.34, 6.5], [0, 1.55, 0], timberDark);
  [-7, -5, -3, -1, 1, 3, 5, 7].forEach((x) => {
    [-2.55, 0, 2.55].forEach((z) => box([0.24, 1.55, 0.24], [x, 0.72, z], timberDark));
  });

  // The rear wall is visible through the central entrance, creating a deep sightline.
  box([15.4, 3.35, 0.24], [0, 3.35, -3], timberDark);
  box([0.24, 3.35, 6.15], [-7.65, 3.35, -0.05], timber);
  box([0.24, 3.35, 6.15], [7.65, 3.35, -0.05], timber);
  box([15.4, 0.22, 3.05], [0, 4.92, -1.48], timberDark);

  // Weathered timber wings frame one ceremonial entrance rather than repeated doors.
  box([6.35, 3.25, 0.22], [-4.52, 3.32, -0.08], timber);
  box([6.35, 3.25, 0.22], [4.52, 3.32, -0.08], timber);
  [-7.25, -6.35, -5.45, -4.55, -3.65, -2.75, -1.85, 1.85, 2.75, 3.65, 4.55, 5.45, 6.35, 7.25].forEach((x) =>
    box([0.055, 3.08, 0.055], [x, 3.32, 0.055], timberLight),
  );

  // The central portal opens to a timber floor and a small pool of daylight beyond.
  box([2.35, 0.08, 3.05], [0, 1.74, -1.48], timber);
  box([0.86, 1.12, 0.06], [0, 3.18, -2.84], warm);
  box([0.2, 3.5, 0.25], [-1.42, 3.36, 0.02], carvedWood);
  box([0.2, 3.5, 0.25], [1.42, 3.36, 0.02], carvedWood);
  box([3.02, 0.2, 0.25], [0, 5.06, 0.02], carvedWood);

  // Carved motifs flank the doorway as a simplified low-poly translation.
  [-1, 1].forEach((side) => {
    box([0.42, 3.12, 0.1], [side * 1.72, 3.35, 0.08], carvedWood);
    [2.14, 2.72, 3.3, 3.88, 4.46].forEach((y, index) =>
      box([0.28, 0.28, 0.1], [side * 1.72, y, 0.15], index % 2 === 0 ? timberLight : timberDark, [0, 0, Math.PI / 4]),
    );
  });

  // Broad shuttered windows and horizontal vents mirror the reference facade.
  [-5.05, 5.05].forEach((x, sideIndex) => {
    box([2.7, 1.26, 0.08], [x, 3.46, 0.06], timberDark);
    box([1.18, 1.18, 0.1], [x + (sideIndex === 0 ? -0.68 : 0.68), 3.46, 0.13], timberLight);
    [-0.92, 0, 0.92].forEach((offset) =>
      box([0.055, 1.1, 0.055], [x + offset, 3.46, 0.17], carvedWood),
    );
    [4.45, 4.68, 4.91].forEach((y) => box([2.5, 0.09, 0.1], [x, y, 0.12], timberDark));
  });
  box([6.18, 0.16, 0.1], [-4.55, 2.05, 0.12], carvedWood);
  box([6.18, 0.16, 0.1], [4.55, 2.05, 0.12], carvedWood);

  // A long ridge pitched across the depth fixes the roof geometry.
  box([16.7, 0.28, 4.2], [0, 5.9, -1.7], roof, [-0.5, 0, 0]);
  box([16.7, 0.28, 4.2], [0, 5.9, 1.7], roof, [0.5, 0, 0]);
  box([16.9, 0.18, 0.28], [0, 6.9, 0], bamboo);

  // A restrained landing and hand-railed stair keep the entrance visually dominant.
  box([15.4, 0.18, 0.28], [0, 1.5, 3.08], carvedWood);
  for (let step = 0; step < 4; step += 1) {
    box([2.2, 0.18, 0.72], [0, 1.34 - step * 0.31, 3.18 + step * 0.55], timberLight);
  }
  [-1.18, 1.18].forEach((x) => {
    box([0.13, 1.45, 0.13], [x, 1.15, 3.12], bamboo);
    box([0.13, 0.95, 0.13], [x, 0.54, 4.85], bamboo);
    box([0.13, 0.13, 2.2], [x, 1.12, 4.02], bamboo, [-0.34, 0, 0]);
  });

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
    const compactLayout = window.matchMedia("(max-width: 899px)").matches;
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
    renderer.toneMappingExposure = compactLayout ? 1.4 : 1.02;
    renderer.shadowMap.enabled = !compactLayout;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 130);
    const ambient = new THREE.HemisphereLight(0xacf0b8, 0x2b1c12, compactLayout ? 2.2 : 1.5);
    scene.add(ambient);
    const moon = new THREE.DirectionalLight(0xdfffd0, 2.9);
    moon.position.set(-11, 24, 12);
    moon.castShadow = true;
    moon.shadow.mapSize.set(1024, 1024);
    scene.add(moon);
    const doorLight = new THREE.PointLight(0xffad55, 7, 26, 2);
    doorLight.position.set(3.5, 3.2, -7.8);
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
    const leafCount = compactLayout ? 104 : 168;
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
    canopy.castShadow = !compactLayout;
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

    const fireflyCount = compactLayout ? 65 : 120;
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

    Promise.allSettled([loadModel("tree-oak.glb")]).then(([oakResult]) => {
      if (disposed) return;
      if (oakResult.status === "fulfilled") {
        const oak = colorizeTree(oakResult.value);
        const protagonist = fitObject(oak.clone(true), 30.5);
        protagonist.rotation.y = -0.35;
        protagonist.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        world.add(protagonist);

        // A lower forest ring frames the village without challenging the story tree.
        const placements: Array<[number, number, number, number]> = [
          [-20, -1, -18, 12.5],
          [-13, -1, -23, 14],
          [-4, -1, -25, 10.5],
          [6, -1, -26, 12],
          [16, -1, -23, 13.5],
          [23, -1, -17, 12],
          [24, -1, -8, 10],
          [20, -1, 1, 8.5],
          [-19, -1, -8, 10.5],
          [-17, -1, 1, 8],
          [-10, -1, -16, 9.5],
          [17, -1, -12, 9],
          [-7, -1, -13, 10.5],
          [-10, -1, -9, 8],
          [14, -1, -14, 10],
          [17, -1, -8, 8.5],
          [-2, -1, -19, 11.5],
          [9, -1, -20, 12.5],
        ];
        placements.forEach(([x, y, z, height], index) => {
          const tree = fitObject(oak.clone(true), height);
          tree.position.add(new THREE.Vector3(x, y, z));
          tree.rotation.y = index * 0.83;
          world.add(tree);
        });
      } else {
        makeLimb(world, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 30.5, 0), 1.9, 0.5, bark);
      }

      makeLonghouse(scene);
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
        new THREE.Vector3(3.5, 7, 17),
        new THREE.Vector3(3.5, 4.2, 7),
        new THREE.Vector3(3.5, 3.25, -4.9),
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
        new THREE.Vector3(3.5, 3.8, -8),
        new THREE.Vector3(3.5, 3, -11),
        new THREE.Vector3(3.5, 3, -9.6),
      ],
      false,
      "catmullrom",
      0.45,
    );
    const { bird: hornbill, leftWing, rightWing, wingMeshes } = makeHornbill(scene);
    const hornbillCameraPoint = new THREE.Vector3();
    const hornbillFocusPoint = new THREE.Vector3();
    const hornbillViewDirection = new THREE.Vector3();
    const hornbillRightDirection = new THREE.Vector3();
    const hornbillWorldUp = new THREE.Vector3(0, 1, 0);
    const hornbillPosition = new THREE.Vector3();
    const hornbillTarget = new THREE.Vector3();
    const hornbillPointAt = (pathProgress: number, target: THREE.Vector3) => {
      const pathT = THREE.MathUtils.clamp(pathProgress, 0, 1);
      const journeyT = THREE.MathUtils.lerp(0.035, 0.84, pathT);
      cameraCurve.getPoint(journeyT, hornbillCameraPoint);
      targetCurve.getPoint(journeyT, hornbillFocusPoint);
      hornbillViewDirection.copy(hornbillFocusPoint).sub(hornbillCameraPoint).normalize();
      hornbillRightDirection.crossVectors(hornbillViewDirection, hornbillWorldUp).normalize();
      const phase = 0.72 + pathT * Math.PI * 4.6;
      const radius = compactLayout ? 2.65 : 3.8;
      target
        .copy(hornbillFocusPoint)
        .addScaledVector(hornbillRightDirection, Math.sin(phase) * radius)
        .addScaledVector(hornbillWorldUp, 2.35 + Math.cos(phase * 0.7) * 0.72)
        .addScaledVector(hornbillViewDirection, Math.cos(phase) * 1.45);
      return target;
    };
    const hornbillTrail = Array.from({ length: 7 }, (_, index) => {
      const glint = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.1, 0),
        new THREE.MeshBasicMaterial({
          color: 0xb7df4b,
          transparent: true,
          opacity: 0.24 - index * 0.025,
          depthTest: false,
          depthWrite: false,
        }),
      );
      glint.visible = false;
      scene.add(glint);
      return glint;
    });

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, compactLayout ? 1.2 : 1.5));
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
      if (compactLayout && t < 0.78) camera.position.x += t < 0.5 ? 1.35 : -1.05;
      camera.lookAt(targetCurve.getPoint(t));
      markers.forEach((marker) => {
        const proximity = Math.max(0, 1 - Math.abs(currentProgress - Number(marker.userData.stage)) * 11);
        const material = marker.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.55 + proximity * 3.1;
        marker.scale.setScalar(0.88 + proximity * 0.5);
      });
      canopy.rotation.y = currentProgress * 0.055;
      const hornbillLinear = THREE.MathUtils.clamp((t - 0.035) / (0.84 - 0.035), 0, 1);
      const hornbillT = 1 - Math.pow(1 - hornbillLinear, 1.25);
      hornbillPointAt(hornbillT, hornbillPosition);
      hornbillPointAt(Math.min(1, hornbillT + 0.012), hornbillTarget);
      hornbill.position.copy(hornbillPosition);
      hornbill.lookAt(hornbillTarget);
      const isFlying = t > 0.035 && t < 0.855;
      const flap = Math.sin(performance.now() * 0.012 + hornbillT * 24);
      leftWing.rotation.z = isFlying ? 0.15 + flap * 0.72 : 0.16;
      rightWing.rotation.z = isFlying ? -0.15 - flap * 0.72 : -0.16;
      wingMeshes.forEach((wing) => {
        wing.scale.x = isFlying ? 0.95 : 0.38;
      });
      const arrivalScale = 1 - THREE.MathUtils.smoothstep(t, 0.82, 0.855);
      const cursorScale = compactLayout
        ? THREE.MathUtils.lerp(1.08, 0.48, THREE.MathUtils.smoothstep(t, 0.18, 0.58))
        : THREE.MathUtils.lerp(1, 0.58, THREE.MathUtils.smoothstep(t, 0.2, 0.62));
      const birdScale = cursorScale * arrivalScale;
      hornbill.scale.setScalar(birdScale);
      hornbill.visible = birdScale > 0.015;
      hornbillTrail.forEach((glint, index) => {
        const trailT = Math.max(0, hornbillT - (index + 1) * 0.012);
        hornbillPointAt(trailT, glint.position);
        glint.scale.setScalar((1 - index / hornbillTrail.length) * arrivalScale);
        glint.visible = isFlying && trailT > 0 && arrivalScale > 0.04;
      });
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
