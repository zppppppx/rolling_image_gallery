const api_root = "http://api.tvmaze.com/shows";

// Fetch one photo from the tv api
const getPhoto = async (id) => {
    try {
        const photo = await axios.get(`${api_root}/${id}`, { headers: { Accept: 'application/json' } });
        return photo.data;
    }
    catch (e) {
        console.log("Error, ", e);
    }
}


// Add some photos from the api
var ids = [];
const addPhotos = async (amount) => {
    var template = document.querySelector('#wrap').innerHTML;
    var html = [];
    var nav_bar = [];

    for (var i = 1; i <= amount; i++) {
        try {
            const photo = await getPhoto(i);
            ids.push(photo.id);
            var _html = template.replace('{{index}}', photo.id)
                .replace('{{img}}', photo.image.original)
                .replace('{{descrip}}', photo.summary)
                .replace('{{caption}}', photo.name)
                .replace('{{onclick_method}}', `click_change(${photo.id})`)
            html.push(_html);

            
            nav_bar.push(`<span id="nav-${photo.id}" class="i" onclick="click_change(${photo.id})">&nbsp</span>`)
        }
        catch (e) {
            console.log("Error, ", e);
        }
    }

    html.push('<div class="nav">' + nav_bar.join('') + '</div>');
    document.querySelector('#wrap').innerHTML = html.join('');


    console.log(ids.length)
    const first_id = rand_pick_id();
    set_photo_curr(ids, first_id);
}

