"use client";

import { RigidBody } from "@react-three/rapier";

export function Cubes() {
  const cubes = [];
  // Ground
  for (let i = -20; i < 20; i++) {
    for (let j = -20; j < 20; j++) {
      cubes.push(
        <RigidBody type="fixed" colliders="cuboid" key={`${i}-${j}`}>
          <mesh receiveShadow castShadow position={[i, 0, j]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={Math.random() > 0.6 ? "#224411" : "#113300"} />
          </mesh>
        </RigidBody>
      );
    }
  }

  // Water
  for (let i = 15; i < 20; i++) {
    for (let j = -20; j < 20; j++) {
      cubes.push(
        <RigidBody type="fixed" colliders="cuboid" key={`water-${i}-${j}`}>
          <mesh receiveShadow castShadow position={[i, -0.5, j]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#0000ff" transparent opacity={0.5} />
          </mesh>
        </RigidBody>
      );
    }
  }

  // Castle
  for (let y = 1; y < 10; y++) {
    for (let x = -5; x < 5; x++) {
      for (let z = -5; z < 5; z++) {
        if (
          ((x === -5 || x === 4) && (z >= -5 && z < 5)) ||
          ((z === -5 || z === 4) && (x > -5 && x < 4))
        ) {
          cubes.push(
            <RigidBody type="fixed" colliders="cuboid" key={`castle-${x}-${y}-${z}`}>
              <mesh receiveShadow castShadow position={[x, y, z]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#888888" />
              </mesh>
            </RigidBody>
          );
        }
      }
    }
  }
    // Castle Towers
    for (let y = 1; y < 15; y++) {
        cubes.push(
            <RigidBody type="fixed" colliders="cuboid" key={`tower-1-${y}`}>
                <mesh receiveShadow castShadow position={[-5, y, -5]}>
                    <boxGeometry args={[2, 1, 2]} />
                    <meshStandardMaterial color="#aaaaaa" />
                </mesh>
            </RigidBody>
        );
        cubes.push(
            <RigidBody type="fixed" colliders="cuboid" key={`tower-2-${y}`}>
                <mesh receiveShadow castShadow position={[4, y, -5]}>
                    <boxGeometry args={[2, 1, 2]} />
                    <meshStandardMaterial color="#aaaaaa" />
                </mesh>
            </RigidBody>
        );
        cubes.push(
            <RigidBody type="fixed" colliders="cuboid" key={`tower-3-${y}`}>
                <mesh receiveShadow castShadow position={[-5, y, 4]}>
                    <boxGeometry args={[2, 1, 2]} />
                    <meshStandardMaterial color="#aaaaaa" />
                </mesh>
            </RigidBody>
        );
        cubes.push(
            <RigidBody type="fixed" colliders="cuboid" key={`tower-4-${y}`}>
                <mesh receiveShadow castShadow position={[4, y, 4]}>
                    <boxGeometry args={[2, 1, 2]} />
                    <meshStandardMaterial color="#aaaaaa" />
                </mesh>
            </RigidBody>
        );
    }


    // Village
    for (let i = 0; i < 10; i++) {
        const x = Math.floor(Math.random() * 30) - 15;
        const z = Math.floor(Math.random() * 30) - 15;
        if (x > 7 || x < -7 || z > 7 || z < -7) {
            for (let y = 1; y < 4; y++) {
                cubes.push(
                    <RigidBody type="fixed" colliders="cuboid" key={`house-${i}-${y}`}>
                        <mesh receiveShadow castShadow position={[x, y, z]}>
                            <boxGeometry args={[2, 2, 2]} />
                            <meshStandardMaterial color="#a0522d" />
                        </mesh>
                    </RigidBody>
                );
            }
            cubes.push(
                <RigidBody type="fixed" colliders="cuboid" key={`roof-${i}`}>
                    <mesh receiveShadow castShadow position={[x, 4, z]}>
                        <coneGeometry args={[2, 2, 4]} />
                        <meshStandardMaterial color="#8b4513" />
                    </mesh>
                </RigidBody>
            );
        }
    }


  return <>{cubes}</>;
}