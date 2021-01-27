export const COLLISION_WORLD = 0x0001;
export const COLLISION_PLAYER = 0x0010;
export const COLLISION_DAMAGE = 0x0100;

if (self.localStorage.getItem('up_key') === null) self.localStorage.setItem('up_key', 'UP');
if (self.localStorage.getItem('left_key') === null) self.localStorage.setItem('left_key', 'LEFT');
if (self.localStorage.getItem('down_key') === null) self.localStorage.setItem('down_key', 'DOWN');
if (self.localStorage.getItem('right_key') === null) self.localStorage.setItem('right_key', 'RIGHT');
if (self.localStorage.getItem('jump_key') === null) self.localStorage.setItem('jump_key', 'SPACE');
if (self.localStorage.getItem('punch_key') === null) self.localStorage.setItem('punch_key', 'X');
if (self.localStorage.getItem('kick_key') === null) self.localStorage.setItem('kick_key', 'Z');

export const PlayerState = {
    idle: 0,
    crouching: 1,
    running: 2,
    sneaking: 3,
    wallSliding: 4,
    flying: 5,
    falling: 6,
    punching1: 7,
    punching2: 8,
    punching3: 9,
    kicking1: 10,
    kicking2: 11,
    knockedDown: 12,
    gettingUp: 13,
    sliding: 14,
    standing: 15
}

export const PlayerSettings = {
    running_speed: 4,
    jumping_force: 8,
    crouching_speed: 2,

    input_key: {
        esc: 'ESC',
        enter: 'ENTER',
        up: self.localStorage.getItem('up_key'),
        left: self.localStorage.getItem('left_key'),
        down: self.localStorage.getItem('down_key'),
        right: self.localStorage.getItem('right_key'),
        jump: self.localStorage.getItem('jump_key'),
        punch: self.localStorage.getItem('punch_key'),
        kick: self.localStorage.getItem('kick_key'),
    }
}