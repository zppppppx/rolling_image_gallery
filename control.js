// Toggle the turn class for curr pic div
const setTurn_curr = async () => {
    setTimeout(() => {

        const photo_curr = document.querySelector('.photo-curr .photo-wrap');
        const id_curr = photo_curr.parentElement.id.split('-')[1];
        const nav_curr = document.querySelector(`#nav-${id_curr}`)
        // const photo_curr = document.querySelector('.photo-wrap');
        // console.log(photo_curr)
        photo_curr.addEventListener('click', () => {
            photo_curr.classList.toggle("turn");
            nav_curr.classList.toggle('i-back');
        })

        // const curr_id = photo_curr.id.slice(6);
        nav_curr.addEventListener('click', () => {
            photo_curr.classList.toggle("turn");
            nav_curr.classList.toggle('i-back');
        })

        // console.log(id_curr, nav_curr)
        // console.log(curr_id, photo_curr.id, photo_curr)

    }, 0)
}


// set the left or right parts' photos' to where they belong
const set_photo_side = function (part_ids, area) {
    const range = find_range();

    for (let id of part_ids) {
        const photo = document.querySelector('#photo-' + id)

        photo.style.left = random(range[area].x) + 'px';
        photo.style.top = random(range[area].y) + 'px';

        photo.style['transform'] = 'rotate(' + random([-150, 150]) + 'deg';
    }
}


// Pick one photo to be the curr
const pick_one_photo = function (id) {
    const photo = document.querySelector('#photo-' + id);
    if (photo) {
        photo.classList.add('photo-curr')
    }
}


// Set the chosen picture's nav button to be enlarged
const choose_nav = function (id) {
    const nav = document.querySelector('#nav-' + id);
    nav.classList.add("i-curr");
}


// set one photo to curr and the left photos to correct area
const set_photo_curr = function (ids, id) {
    pick_one_photo(id);
    const left_photos = find_left_photos(ids, id);

    const part_left = left_photos.splice(0, Math.ceil(left_photos.length / 2));
    const part_right = left_photos;

    console.log(part_left, part_right)
    set_photo_side(part_left, 'left')
    set_photo_side(part_right, 'right')
}


// set current photo
const set_curr = async (ids, id) => {
    // const photo_curr = document.querySelector()
    set_photo_curr(ids, id);
    choose_nav(id);

}


// set turn or cur
const turn_control = async (ids, id) => {
    setTimeout(() => {
        // set_curr(ids, id);
        var photo_set = document.querySelector(`#photo-${id} .photo-wrap`);
        var nav_set = document.querySelector(`#nav-${id}`)

        var photo_curr = document.querySelector('.photo-curr');
        var id_curr = photo_curr.id.split('-')[1];
        var nav_curr = document.querySelector(`#nav-${id_curr}`)
        if(id !== id_curr) {

        }
        // photo_curr.addEventListener('click', () => {
        //     photo_curr.classList.toggle("turn");
        //     nav_curr.classList.toggle('i-back');
        // })

        // const curr_id = photo_curr.id.slice(6);
        nav_set.addEventListener('click', () => {
            
            console.log(photo_curr)
            photo_curr.classList.remove('photo-curr');
            // photo_curr.style = '';
            nav_curr.classList.remove('i-curr');

            photo_curr.removeEventListener('click', () => {
                photo_curr.classList.toggle("turn");
                nav_curr.classList.toggle('i-back');
            })

            nav_curr.removeEventListener('click', () => {
                photo_curr.classList.toggle("turn");
                nav_curr.classList.toggle('i-back');
            })

            set_curr(ids, id);
            photo_set.style = ''
            photo_set.classList.toggle("turn");
            nav_set.classList.toggle('i-back');
        })

    }, 0)
}


// const turn_pic = function (id) {
//     document.querySelector(`#photo-${id} .photo-wrap`).classList.toggle("turn");
// }


// Complete pipeline of the webpage
async function control() {
    await addPhotos(3);
    // await setTurn_curr();
}

control()