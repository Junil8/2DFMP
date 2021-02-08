export const COLLISION_DEFAULT = 0x1000;
export const COLLISION_WORLD = 0x0001;
export const COLLISION_CHARACTER = 0x0010;
export const COLLISION_DAMAGE = 0x0100;

if (self.localStorage.getItem('up_key') === null) self.localStorage.setItem('up_key', 'UP');
if (self.localStorage.getItem('left_key') === null) self.localStorage.setItem('left_key', 'LEFT');
if (self.localStorage.getItem('down_key') === null) self.localStorage.setItem('down_key', 'DOWN');
if (self.localStorage.getItem('right_key') === null) self.localStorage.setItem('right_key', 'RIGHT');
if (self.localStorage.getItem('jump_key') === null) self.localStorage.setItem('jump_key', 'SPACE');
if (self.localStorage.getItem('punch_key') === null) self.localStorage.setItem('punch_key', 'X');
if (self.localStorage.getItem('kick_key') === null) self.localStorage.setItem('kick_key', 'Z');

export const PlayerAnimation = {
    idle: 'idle',
    crouching: 'crouch',
    running: 'run',
    sneaking: 'crouch_walk',
    wallSliding: 'wall_slide',
    jumping: 'fly',
    falling: 'fall',
    punching1: 'punch_1',
    punching2: 'punch_2',
    punching3: 'punch_3',
    punchingWhileRunning: 'run_punch',
    kicking1: 'kick_1',
    kicking2: 'kick_2',
    knockedDown: 'knock_down',
    gettingUp: 'get_up',
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