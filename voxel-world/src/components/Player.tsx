"use client";

import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CapsuleCollider, RapierRigidBody, useRapier } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";
import { Ray } from "@dimforge/rapier3d-compat";

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export function Player() {
  const ref = useRef<RapierRigidBody>(null);
  const rapier = useRapier();
  const [, get] = useKeyboardControls();

  useFrame((state) => {
    if (!ref.current) return;
    const { forward, backward, left, right, jump } = get();
    const velocity = ref.current.linvel();

    // update camera
    state.camera.position.copy(ref.current.translation());

    // movement
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(state.camera.rotation);
    ref.current.setLinvel(new THREE.Vector3(direction.x, velocity.y, direction.z), true);

    // jumping
    const { world } = rapier;
    const ray = world.castRay(
      new Ray(ref.current.translation(), new THREE.Vector3(0, -1, 0)),
      1.75,
      true
    );
    const grounded = ray && ray.collider && Math.abs(ray.timeOfImpact) <= 1.75;
    if (jump && grounded) ref.current.setLinvel(new THREE.Vector3(velocity.x, 10, velocity.z), true);
  });

  return (
    <>
      <RigidBody
        ref={ref}
        colliders={false}
        mass={1}
        type="dynamic"
        position={[0, 10, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
    </>
  );
}
