export const COLLISION_WORLD = 0x0001;
export const COLLISION_PLAYER = 0x0010;
export const COLLISION_DAMAGE = 0x0100;

export const State = { idle: 0, running: 1, falling: 2, wallSliding: 3, crouching: 4, sneaking: 5, flying: 6 };

export const PlayerSettings = {
    running_speed: 4,
    jumping_force: 8,
    crouching_speed: 2
}