import axios from 'axios';



 export  async function getImagesByQuery(query,page) {
     const res = await axios.get('https://pixabay.com/api/', {
	params: {
        key: '55127817-55120131a00f673dd7cbfbc42',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
    

}
})
 return res.data;
}