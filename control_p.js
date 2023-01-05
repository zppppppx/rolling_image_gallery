const random = function ([min, max]) {
    return Math.random() * (max - min) + min;
}


const find_range = function () {
    var range = { left: { x: [], y: [] }, right: { x: [], y: [] } };

    var wrap_c = {
        w: document.querySelector('#wrap').clientWidth,
        h: document.querySelector('#wrap').clientHeight
    }

    var photo_c = {
        w: document.querySelector('.photo').clientWidth,
        h: document.querySelector('.photo').clientHeight
    }

    range.wrap_c = wrap_c
    range.photo_c = photo_c

    range.left.x = [-photo_c.w, wrap_c.w / 2 - photo_c.w / 2];
    range.left.y = [-photo_c.h, wrap_c.h]

    range.right.x = [wrap_c.w / 2 + photo_c.w / 2, wrap_c.w + photo_c.w];
    range.right.y = range.left.y

    return range;
}


const rand_pick_id = function () {
    const ind = Math.floor(Math.random() * ids.length) + 1;
    console.log(`The first random ind is ${ind}`);
    return ind;
}


// find the left photos that are not the photo-curr
const find_left_photos = function (ids, id) {
    const left_photos = ids.filter(x => x !== id);
    return left_photos;
}


// set the left or right parts' photos' to where they belong
const set_photo_side = function (part_ids, area) {
    const range = find_range();

    for (let id of part_ids) {
        const photo = document.querySelector('#photo-' + id)

        photo.style.left = random(range[area].x) + 'px';
        photo.style.top = random(range[area].y) + 'px';

        photo.style['transform'] = 'rotate(' + random([-360, 720]) + 'deg';
    }
}


// Pick one photo to be the curr
const pick_one_photo = function (id) {
    const photo = document.querySelector('#photo-' + id);
    if (photo) {
        photo.style = '';
        photo.classList.add('photo-curr')
    }
}


// Set the chosen picture's nav button to be enlarged
const choose_nav = function (id) {
    // console.log(id)
    const nav = document.querySelector(`#nav-${id}`);
    nav.classList.add("i-curr");
}


// set one photo to curr and the left photos to correct area
const set_photo_curr = function (ids, id) {
    pick_one_photo(id);
    choose_nav(id);
    const left_photos = find_left_photos(ids, id);

    const part_left = left_photos.splice(0, Math.ceil(left_photos.length / 2));
    const part_right = left_photos;

    // console.log(part_left, part_right)
    set_photo_side(part_left, 'left')
    set_photo_side(part_right, 'right')
}


//
const turn_id = function(id) {
    const photo_curr = document.querySelector(`#photo-${id} .photo-wrap`);
    const nav_curr = document.querySelector(`#nav-${id}`);
    photo_curr.classList.toggle('turn');
    nav_curr.classList.toggle('i-back')
}


// Set the non-current picture to be the current (functional for nav bar units and pictures)
const click_change = function(id) {
    const id_curr = document.querySelector(`.i-curr`).id.split('-')[1];
    if (id_curr === `${id}`) {
        // click_turn(id);
        turn_id(id);
    }
    else {
        const photo_curr_wrap = document.querySelector('.photo-curr .photo-wrap');
        photo_curr_wrap.classList.remove('turn');
        photo_curr_wrap.parentElement.classList.remove('photo-curr');
        const nav_curr = document.querySelector('.i-curr');
        nav_curr.classList.remove('i-curr', 'i-back');

        set_photo_curr(ids, id);
    }
}


// final pipeline
async function control() {
    await addPhotos(100);
}

control()